const database = require('../database')

module.exports = (req, res, next) => {
  const { type } = req.body
  database.changeUsersType(type).then(user => {
    res.json({})
  })
}
