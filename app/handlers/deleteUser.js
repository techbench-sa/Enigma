const database = require('../database')

module.exports = (req, res, next) => {
  const { id } = req.body
  database.deleteUser(id).then(user => {
    res.json({})
  })
}
