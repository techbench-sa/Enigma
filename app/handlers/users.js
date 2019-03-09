const database = require('../database')

module.exports = (req, res, next) => {
  console.log('fetch users')
  database.getUsers().then(users => {
    res.json(users)
  })
}
