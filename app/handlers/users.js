const database = require('../database')

module.exports = (req, res, next) => {
  database.getUsers().then(users => {
    res.json(users)
  })
}
