const pg = require('pg')
// const fs = require('fs')

const pool = new pg.Pool({
  database: 'hackathon',
  host: 'localhost',
  password: 'hadi',
  port: 5432,
  user: 'admin'
})

pool.connect(err => {
  if (err) {
    console.log("\033[0;31m[pg] couldn't connect\033[0m")
    console.error(err)
  } else {
    console.log('\033[0;32m[pg] connected\033[0m')
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
      pool.query(
        `SELECT id, name, description, points, COALESCE(s.score,0) AS score, hidden
        FROM "challenge" c LEFT JOIN (SELECT  score, challenge_id FROM "submission" WHERE player_id=${id}) AS s
        ON c.id =  s.challenge_id;`,
        (err, res) => {
          if (err) reject(err)
          else resolve(res.rows)
        }
      )
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

  changeVisibility: (id, hidden) => {
    return new Promise((resolve, reject) => {
      pool.query(`UPDATE "challenge" SET hidden=${+!!hidden} WHERE id=${+id}`, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  },

  addSubmission: ({ player_id, challenge_id, code, score, lang }) => {
    return new Promise((resolve, reject) => {
      
      pool.query(
        `UPDATE "submission" SET code=$1::text, score=$2::int, language=$3::text WHERE player_id=$4::int AND challenge_id=$5::int;`,
        [code, score, lang, player_id, challenge_id],
        (err, res) => {
          if (err) {
            console.error('[err] database.js:114')
            reject(err)
          }
          if (res && res.rowCount === 0) {
            pool.query(
              `INSERT INTO "submission" (player_id, challenge_id, code, score, language) VALUES ($1::int, $2::int, $3::text, $4::int, $5::text);`,
              [player_id, challenge_id, code, score, lang],
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
