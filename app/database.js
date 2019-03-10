const pg = require('pg')
// const fs = require('fs')

const GET_CHALLENGE =  `SELECT * FROM "challenge" WHERE id=$1::int`
const GET_CHALLENGES = `
  SELECT id, name, description, points, COALESCE(s.score,0) score, type FROM "challenge"  
  LEFT JOIN 
  (SELECT score, challenge_id FROM "submission" WHERE player_id=$1::int) AS s
  ON challenge.id =  s.challenge_id
  WHERE type IN (SELECT type FROM "user" WHERE id=$1::int) OR 0 IN (SELECT type FROM "user" WHERE id=$1::int)
  ORDER BY id
  ;
`
const ADD_CHALLENGE = `INSERT INTO "challenge" (name, description, method_name, method_type, tests, parameters, points) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int);`
const CHANGE_CHALLENGE_VISIBILITY = 'UPDATE "challenge" SET type=$1::int WHERE id=$2::int;'
const CHANGE_CHALLENGES_VISIBILITY = 'UPDATE "challenge" SET type=$1::int;'

const ADD_USER = 'INSERT INTO "user" (name, username, email, phone_number, password) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text);'
const GET_USER_BY_USERNAME = 'SELECT * FROM "user" WHERE username=$1::text;'
const GET_USER_BY_ID = 'SELECT * FROM "user" WHERE id=$1::int;'
const GET_USERS = 'SELECT * FROM "user";'
const GET_USER_SCORE = 'SELECT sum(score) FROM "submission" WHERE player_id=$1::int;'
const CHANGE_USER_TYPE_BY_ID = 'UPDATE "user" SET type=$2::int WHERE id=$1::int;'
const CHANGE_USERS_TYPE = 'UPDATE "user" SET type=$1::int WHERE type <> 0;'

const ADD_SUBMISSION = 'INSERT INTO "submission" (player_id, challenge_id, code, score, language) VALUES ($1::int, $2::int, $3::text, $4::int, $5::text);'
const UPDATE_SUBMISSION = 'UPDATE "submission" SET code=$3::text, score=$4::int, language=$5::text WHERE player_id=$1::int AND challenge_id=$2::int;'

const pool = new pg.Pool({
  database: 'enigma',
  host: 'localhost',
  password: 'hadi',
  port: 5432,
  user: 'admin'
})

pool.connect(err => {
  if (err) {
    console.log('\033[0;31m' + '[pg] couldn\'t connect' + '\033[0m')
    console.error(err)
  } else {
    console.log('\033[0;32m' +'[pg] connected' + '\033[0m')
  }
})

module.exports = {
  getUserByUsername: username => {
    console.log("hey hadi")
    return pool.query(GET_USER_BY_USERNAME, [username]).then(res => {
      return { ...res.rows[0] }
    })
  },

  getUserByID: id => {
    return pool.query(GET_USER_BY_ID, [id]).then(res => {
      return { ...res.rows[0] }
    }).catch(() => {})
  },

  getUsers: () => {
    return pool.query(GET_USERS).then(res => {
      return res.rows
    })
  },

  getScore: id => {
    return pool.query(GET_USER_SCORE, [id]).then(res => {
      return res.rows[0].sum || 0
    })
  },

  getChallenges: id => {
    return pool.query(GET_CHALLENGES, [id]).then(res => {
       return res.rows
    })
  },

  getChallenge: id => {
    return pool.query(GET_CHALLENGE, [id]).then(res => {
      return res.rows[0]
    })
  },

  addChallenge: data => {
    return pool.query(ADD_CHALLENGE, [
      data.challenge.name,
      data.challenge.description,
      data.method.name,
      data.method.type,
      JSON.stringify(data.tests),
      JSON.stringify(data.params),
      data.challenge.score
    ]).then(res => res.insertId)
  },

  changeUserType: (id, type) => {
    return pool.query(CHANGE_USER_TYPE_BY_ID, [id, +type])
  },

  changeUsersType: type => {
    return pool.query(CHANGE_USERS_TYPE, [+type])
  },

  changeVisibilityForAll: type => {
    return pool.query(CHANGE_CHALLENGES_VISIBILITY, [+type])
  },

  changeVisibility: (id, type) => {
    return pool.query(CHANGE_CHALLENGE_VISIBILITY, [+type, id])
  },

  addSubmission: ({ player_id, challenge_id, code, score, lang }) => {
    const args = [player_id, challenge_id, code, score, lang]
    return pool.query(UPDATE_SUBMISSION, args).then(res => {
      if (res.rowCount === 0)
        return pool.query(ADD_SUBMISSION, args)
    })
  },

  registerUser: ({ name, username, email, phoneNumber, password }) => {
    return pool.query(ADD_USER, [name, username, email, phoneNumber, password])
  }
}
