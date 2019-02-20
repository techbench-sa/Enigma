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
    console.log("[pg] couldn't connect")
    console.error(err)
  } else {
    console.log('[pg] connected')
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
        `SELECT sum(score) FROM "submission" WHERE playerid=${id};`,
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
        `SELECT id, name, description, points, COALESCE(s.score,0) AS score
        FROM "challenge" c LEFT JOIN (SELECT  score, challengeid FROM "submission" WHERE playerid=${id}) AS s
        ON c.id =  s.challengeid;`,
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

  addSubmission: ({ playerID, challengeID, code, score }) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE "submission" SET score=${score} WHERE playerid=${playerID} and challengeid=${challengeID};`,
        (err, res) => {
          if (err) reject(err)
          if (res.rowCount === 0) {
            pool.query(
              `INSERT INTO "submission" (playerid, challengeid, code, score, language) VALUES (${playerID}, ${challengeID}, '${code}', ${score}, 'Java');`,
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
