const pg = require('pg')

const ADD_CHALLENGE =
  'INSERT INTO "challenge" (name, description, method_name, method_type, tests, parameters, points) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int);'
const GET_CHALLENGE = 'SELECT * FROM "challenge" WHERE id=$1::int'
const GET_CHALLENGES =
  'SELECT id, name, description, points,  type, COALESCE(sum(CASE WHEN s.is_solved THEN 1 ELSE 0 END), 0)  is_solved FROM "challenge" LEFT JOIN (SELECT is_solved, challenge_id FROM "submission" WHERE player_id=$1::int) AS s ON challenge.id =  s.challenge_id WHERE type IN (SELECT type FROM "user" WHERE id=$1::int) OR 0 IN (SELECT type FROM "user" WHERE id=$1::int) GROUP BY id ORDER BY id;'
const CHANGE_CHALLENGE_TYPE =
  'UPDATE "challenge" SET type=$1::int WHERE id=$2::int;'
const CHANGE_CHALLENGES_TYPE = 'UPDATE "challenge" SET type=$1::int;'
const DELETE_CHALLENGE = 'DELETE FROM "challenge" WHERE id=$1::int;'

const ADD_USER =
  'WITH user_insert AS ( INSERT INTO "user" (name, username, email, phone_number, password, gender) SELECT $1::text, $2::text, $3::text, $4::text, $5::text, $6::boolean WHERE EXISTS (SELECT string FROM "token" where string=$7::text AND NOT is_used) RETURNING id) UPDATE "token" SET is_used=TRUE, user_id=(SELECT id FROM user_insert) WHERE string=$7::text AND NOT is_used;'
const GET_USER = 'SELECT * FROM "user" WHERE id=$1::int;'
const GET_USER_DATA =
  'SELECT *  FROM "user" u  JOIN (SELECT SUM(score) score, player_id, COUNT(is_solved) solved FROM "submission" where player_id=$1::int group by player_id) AS s ON u.id=s.player_id WHERE u.id=$1::int;'
const GET_USER_BY_USERNAME = 'SELECT * FROM "user" WHERE username=$1::text;'
const GET_USERS =
  'SELECT u.*, COALESCE(score, 0) score, COALESCE(solved, 0) solved FROM "user" u LEFT JOIN (SELECT SUM(score) score, player_id, COUNT(is_solved) solved FROM "submission" group by player_id) AS s ON u.id=s.player_id;'
const GET_USER_SUBMISSIONS =
  'SELECT COALESCE(SUM(score), 0)score FROM "submission" WHERE player_id=$1::int;'

const CHANGE_USER_TYPE = 'UPDATE "user" SET type=$2::int WHERE id=$1::int;'
const CHANGE_USERS_TYPE = 'UPDATE "user" SET type=$1::int WHERE type <> 0;'
const DELETE_USER = 'DELETE FROM "user" WHERE id=$1::int;'

// select id, s.is_solved, s.timestamp from challenge as c  join (select is_solved, timestamp, challenge_id from submission where player_id = 2) as s ON c.id = s.challenge_id
// const ADD_SUBMISSION_ = 'INSERT INTO "submission" (player_id, challenge_id, code, score, language, is_solved) VALUES ($1::int, $2::int, $3::text, $4::int, $5::text, $6::boolean);'

const ADD_SUBMISSION =
  'INSERT INTO "submission" (player_id, challenge_id, code, language, is_solved, score) SELECT $1::int, $2::int, $3::text, $5::text, $6::boolean, CASE WHEN count(challenge_id) < 10 AND $6::boolean THEN 10-count(challenge_id) ELSE 0 END+$4::int*CASE WHEN $6::boolean THEN 2 ELSE 1 END from "submission" where challenge_id = $2::int AND is_solved;'
const UPDATE_SUBMISSION =
  'UPDATE "submission" SET code=$3::text, language=$5::text, is_solved=$6::boolean, score=(SELECT CASE WHEN count(challenge_id) < 10 AND $6::boolean THEN 10-count(challenge_id) ELSE 0 END+$4::INT*CASE WHEN $6::boolean THEN 2 ELSE 1 END from "submission" WHERE challenge_id = $2::int AND is_solved) WHERE player_id = $1::int AND challenge_id = $2::int;'

const GET_TOKENS = 'SELECT * FROM "token" ORDER BY user_id'

// const START_TIME = new Date('2019-03-10T13:00:00')

const pool = new pg.Pool({
  database: 'enigma',
  host: 'localhost',
  password: 'hadi',
  port: 5432,
  user: 'admin'
})

pool.connect(err => {
  if (err) {
    console.log('\x1B[0;31m' + "[pg] couldn't connect" + '\x1B[0m')
    console.error(err)
  } else {
    console.log('\x1B[0;32m' + '[pg] connected' + '\x1B[0m')
    // pool.query(ADD_SUBMISSION, [2, 1, '', 0, 'java', true])
  }
})

module.exports = {
  getUserByUsername: username => {
    return pool.query(GET_USER_BY_USERNAME, [username]).then(res => {
      return { ...res.rows[0] }
    })
  },

  getUserByID: id => {
    return pool
      .query(GET_USER, [id])
      .then(res => {
        return { ...res.rows[0] }
      })
      .catch(() => {})
  },

  getUserData: id => {
    return pool
      .query(GET_USER_DATA, [id])
      .then(res => {
        return { ...res.rows[0] }
      })
      .catch(() => {})
  },

  getUsers: () => {
    return pool.query(GET_USERS).then(res => {
      return res.rows
    })
  },

  getScore: id => {
    return pool.query(GET_USER_SUBMISSIONS, [id]).then(res => {
      return res.rows[0].score
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

  deleteChallenge: id => {
    return pool.query(DELETE_CHALLENGE, [id])
  },

  addChallenge: data => {
    return pool
      .query(ADD_CHALLENGE, [
        data.challenge.name,
        data.challenge.description,
        data.method.name,
        data.method.type,
        JSON.stringify(data.tests),
        JSON.stringify(data.params),
        data.challenge.score
      ])
      .then(res => res.insertId)
  },

  changeUserType: (id, type) => {
    return pool.query(CHANGE_USER_TYPE, [id, +type])
  },

  changeUsersType: type => {
    return pool.query(CHANGE_USERS_TYPE, [+type])
  },

  changeVisibilityForAll: type => {
    return pool.query(CHANGE_CHALLENGES_TYPE, [+type])
  },

  changeVisibility: (id, type) => {
    return pool.query(CHANGE_CHALLENGE_TYPE, [+type, id])
  },

  addSubmission: ({
    player_id,
    challenge_id,
    code,
    score,
    lang,
    is_solved = false
  }) => {
    const args = [player_id, challenge_id, code, score, lang, is_solved]
    return pool.query(UPDATE_SUBMISSION, args).then(res => {
      console.log(res)
      if (res.rowCount === 0) {
        return pool.query(ADD_SUBMISSION, args)
      }
    })
  },

  registerUser: ({ name, username, email, phoneNumber, password, gender, token }) => {
    console.log(name, username, email, phoneNumber, password, gender, token)
    // if (res.rowCount === 0)
    //   Faild
    // else
    //   Success
    return pool.query(ADD_USER, [name, username, email, phoneNumber, password, gender, token])
  },

  deleteUser: (id) => {
    return pool.query(DELETE_USER, [id])
  },

  getTokens: () => {
    return pool.query(GET_TOKENS).then(res => res.rows)
  }
}
