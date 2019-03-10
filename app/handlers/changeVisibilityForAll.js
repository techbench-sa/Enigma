const database = require('../database')

module.exports = (req, res, next) => {
  const { visibility } = req.body
  database.changeVisibilityForAll(visibility).then(user => {
    res.json({})
  })
}
