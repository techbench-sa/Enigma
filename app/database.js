const pg = require('pg')
// const fs = require('fs')

const getChallengesQuery = id => `
  SELECT id, name, description, points, COALESCE(s.score,0) score, type FROM "challenge"  
  LEFT JOIN 
  (SELECT score, challenge_id FROM "submission" WHERE player_id=${id}) AS s
  ON challenge.id =  s.challenge_id
  WHERE type IN (SELECT type FROM "user" WHERE id=${id}) OR 0 IN (SELECT type FROM "user" WHERE id=${id})
  ORDER BY id
  ;
`

const pool = new pg.Pool({
  database: 'enigma',
  host: 'localhost',
  password: 'hadi',
  port: 5432,
  user: 'admin'
})

pool.connect(err => {
  if (err) {
    console.log("[pg] couldn't connect")
    console.error(err)
  } else {
    console.log('\033[0;32m' +'[pg] connected' + '\033[0m')
  }
})

module.exports = {
  getUserByUsername: username => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM "user" WHERE username='${username}';`,
        (err, res) => {
          if (err) reject(err)
          else resolve({ ...res.rows[0] })
        }
      )
    })
  },

  getUserByID: id => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM "user" WHERE id=${id};`, (err, res) => {
        if (err) resolve({})
        else resolve({ ...res.rows[0] })
      })
    })
  },

  getScore: id => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT sum(score) FROM "submission" WHERE player_id=${id};`,
        (err, res) => {
          if (err) reject(err)
          else resolve(res.rows[0].sum || 0)
        }
      )
    })
  },

  getChallenges: id => {
    return new Promise((resolve, reject) => {
      pool.query(getChallengesQuery(id), (err, res) => {
        if (err) reject(err)
        else resolve(res.rows)
      })
    })
  },

  getChallenge: id => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM "challenge" WHERE id=${id}`, (err, res) => {
        if (err) reject(err)
        else resolve(res.rows[0])
      })
    })
  },

  addChallenge: data => {
    return new Promise((resolve, reject) => {
      const name = data.challenge.name
      const description = data.challenge.description
      const method_name = data.method.name
      const method_type = data.method.type
      const tests = JSON.stringify(data.tests)
      const parameters = JSON.stringify(data.params)
      const points = data.challenge.score
      pool.query(
        `INSERT INTO "challenge" (name, description, method_name, method_type, tests, parameters, points) VALUES ('${name}', '${description}', '${method_name}', '${method_type}', '${tests}', '${parameters}', ${points})`,
        (err, res) => {
          if (err) reject(err)
          else resolve(res.insertId)
        }
      )
    })
  },

  changeAllUsersType: (type) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE "user" SET type=${+type} WHERE type <> 0`,
        (err, res) => {
          if (err) reject(err)
          else resolve(res)
        }
      )
    })
  },

  changeVisibilityForAll: (type) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE "challenge" SET type=${+type}`,
        (err, res) => {
          if (err) reject(err)
          else resolve(res)
        }
      )
    })
  },

  changeVisibility: (id, type) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE "challenge" SET type=${+type} WHERE id=${+id}`,
        (err, res) => {
          if (err) reject(err)
          else resolve(res)
        }
      )
    })
  },

  addSubmission: ({ player_id, challenge_id, code, score }) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE "submission" SET code='${code}', score=${score} WHERE player_id=${player_id} AND challenge_id=${challenge_id};`,
        (err, res) => {
          if (err) reject(err)
          if (res.rowCount === 0) {
            pool.query(
              `INSERT INTO "submission" (player_id, challenge_id, code, score, language) VALUES (${player_id}, ${challenge_id}, '${code}', ${score}, 'Java');`,
              (err, res) => {
                if (err) reject(err)
                else resolve()
              }
            )
          }
          resolve()
        }
      )
    })
  }
}
