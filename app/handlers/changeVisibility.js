const database = require('../database')

module.exports = (req, res, next) => {
  const { id, type } = req.body
  database.changeVisibility(id, type).then(user => {
    res.json({})
  })
}
