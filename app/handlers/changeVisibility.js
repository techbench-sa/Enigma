const database = require('../database')

module.exports = (req, res, next) => {
  const { id, hidden } = req.body
  database.changeVisibility(id, hidden).then(user => {
    res.json({})
  })
}