const database = require('../database')

module.exports = (req, res, next) => {
  const { id } = req.body
  database.deleteChallenge(id).then(challenge => {
    res.json({})
  })
}
