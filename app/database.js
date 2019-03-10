const pg = require('pg')

const ADD_CHALLENGE = 'INSERT INTO "challenge" (name, description, method_name, method_type, tests, parameters, points) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::int);'
const GET_CHALLENGE = 'SELECT * FROM "challenge" WHERE id=$1::int'
const GET_CHALLENGES = 'SELECT id, name, description, points,  type, COALESCE(sum(CASE WHEN s.is_solved THEN 1 ELSE 0 END), 0)  is_solved FROM "challenge" LEFT JOIN (SELECT is_solved, challenge_id FROM "submission" WHERE player_id=$1::int) AS s ON challenge.id =  s.challenge_id WHERE type IN (SELECT type FROM "user" WHERE id=$1::int) OR 0 IN (SELECT type FROM "user" WHERE id=$1::int) GROUP BY id ORDER BY id;'
const CHANGE_CHALLENGE_TYPE = 'UPDATE "challenge" SET type=$1::int WHERE id=$2::int;'
const CHANGE_CHALLENGES_TYPE = 'UPDATE "challenge" SET type=$1::int;'
const DELETE_CHALLENGE = 'DELETE FROM "challenge" WHERE id=$1::int;'

const ADD_USER = 'INSERT INTO "user" (name, username, email, phone_number, password) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text);'
const GET_USER = 'SELECT * FROM "user" WHERE id=$1::int;'
const GET_USER_BY_USERNAME = 'SELECT * FROM "user" WHERE username=$1::text;'
const GET_USERS = 'SELECT * FROM "user";'
const CHANGE_USER_TYPE = 'UPDATE "user" SET type=$2::int WHERE id=$1::int;'
const CHANGE_USERS_TYPE = 'UPDATE "user" SET type=$1::int WHERE type <> 0;'
const DELETE_USER = 'DELETE FROM "user" WHERE id=$1::int;'

// select id, s.is_solved, s.timestamp from challenge as c  join (select is_solved, timestamp, challenge_id from submission where player_id = 2) as s ON c.id = s.challenge_id
const ADD_SUBMISSION = 'INSERT INTO "submission" (player_id, challenge_id, code, score, language, is_solved) VALUES ($1::int, $2::int, $3::text, $4::int, $5::text, $6::boolean);'
const GET_USER_SUBMISSIONS = 'SELECT * FROM "submission" WHERE player_id=$1::int;'

const pool = new pg.Pool({
  database: 'enigma',
  host: 'localhost',
  password: 'hadi',
  port: 5432,
  user: 'admin'
})
const START_TIME = new Date() - (1000 * 60 * 60)

pool.connect(err => {
  if (err) {
    console.log('\x1B[0;31m' + '[pg] couldn\'t connect' + '\x1B[0m')
    console.error(err)
  } else {
    console.log('\x1B[0;32m' + '[pg] connected' + '\x1B[0m')
  }
})

module.exports = {
  getUserByUsername: username => {
    return pool.query(GET_USER_BY_USERNAME, [username]).then(res => {
      return { ...res.rows[0] }
    })
  },

  getUserByID: id => {
    return pool.query(GET_USER, [id]).then(res => {
      return { ...res.rows[0] }
    }).catch(() => {})
  },

  getUsers: () => {
    return pool.query(GET_USERS).then(res => {
      return res.rows
    })
  },

  getScore: id => {
    return pool.query(GET_USER_SUBMISSIONS, [1]).then(res => {
      return [...res.rows.reduce((map, submission) => {
        let { challenge_id: id, is_solved, timestamp } = submission
        let attempts = 1
        let time = timestamp - START_TIME
        if (map.has(id)) {
          attempts += map.get(id).attempts
          is_solved = is_solved || map.get(id).is_solved
          time = Math.max(time, map.get(id).time)
        }
        map.set(id, { attempts, is_solved, time })
        return map
      }, new Map)].reduce((score, [id, { attempts, is_solved, time }]) => {
        return score + Math.max((attempts - 1 + (time / 1000 | 0)) * is_solved, 0)
      }, 0)
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

  addSubmission: ({ player_id, challenge_id, code, score, lang, is_solved = false }) => {
    const args = [player_id, challenge_id, code, score, lang, is_solved]
    return pool.query(ADD_SUBMISSION, args)
  },

  registerUser: ({ name, username, email, phoneNumber, password }) => {
    return pool.query(ADD_USER, [name, username, email, phoneNumber, password])
  },

  deleteUser: ({ id }) => {
    return pool.query(DELETE_USER, [id])
  },

  deleteChallenge: ({ id }) => {
    return pool.query(DELETE_CHALLENGE, [id])
  }
}
