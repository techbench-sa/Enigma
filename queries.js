const pg = require('pg')
// const fs = require('fs')

const pool = new pg.Pool({
    database: 'hackathon',
    host: 'localhost',
    password: 'password',
    port: 5432,
    user: 'hadi'
})

// var sql = fs.readFileSync('seed.sql').toString()

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "user"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = getUsers
