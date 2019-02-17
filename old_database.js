const mysql = require('mysql')
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'hackathon_system'
})

db.connect(err => {
  if (err) console.log(err)
  else {
    console.log('Connected to Database!')
  }
})

module.exports = {
  getUserByUsername: username => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM "user" WHERE username='${username}'`,
        (err, res) => {
          if (err) reject('ERROR: 06')
          else resolve({ ...res[0] })
        }
      )
    })
  },

  getUserByID: id => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM "user" WHERE id=${id}`, (err, res) => {
        // if (err) reject('ERROR: 05')
        if (err) resolve({})
        else resolve({ ...res[0] })
      })
    })
  },

  getScore: id => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT SUM(score) FROM "submission" WHERE playerID=${id}`,
        (err, res) => {
          resolve(res[0]['SUM(score)'] || 0)
        }
      )
    })
  },

  getChallenges: id => {
    return new Promise((resolve, reject) => {
      db.query(
        `
                SELECT * FROM challenges
                LEFT JOIN (SELECT * FROM "submission" WHERE playerID = ${id}) AS submissions
                ON number = submissions.challengeNumber;
            `,
        (err, res) => {
          if (err) {
            reject('ERROR: 04')
          } else {
            const challenges = res.map(challenge => ({
              number: challenge.number,
              name: challenge.name,
              description: challenge.description,
              points: challenge.points,
              score: +challenge.score
            }))
            resolve(challenges)
          }
        }
      )
    })
  },

  getChallenge: id => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM "challenge" WHERE number=${id}`, (err, res) => {
        if (err) reject('ERROR: 03')
        else if (res[0]) {
          resolve(res[0])
        } else {
          resolve({})
        }
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
      db.query(
        `INSERT INTO challenges (name, description, method_name, method_type, tests, parameters, points) VALUES ('${name}', '${description}', '${method_name}', '${method_type}', '${tests}', '${parameters}', ${points})`,
        (err, res) => {
          if (err) reject('ERROR: 01')
          else resolve(res.insertId)
        }
      )
    })
  },

  addSubmission: ({ id, number, code, score }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE submissions SET score=${score} WHERE playerID=${id} and challengeNumber=${number}`,
        (err, res) => {
          if (err) {
            reject()
          } else if (res.affectedRows == 0) {
            db.query(
              `INSERT INTO submissions (playerID, challengeNumber, code, score) VALUES (${id}, ${number}, '${code}', ${score})`,
              (err, res) => {
                if (err) reject('ERROR: 02')
                else resolve()
              }
            )
          } else {
            resolve()
          }
        }
      )
    })
  }
  // INSERT INTO submissions (playerID, challengeNumber, code, score) VALUES (${playerID}, ${challengeNumber}, '${code}', ${score})
}
