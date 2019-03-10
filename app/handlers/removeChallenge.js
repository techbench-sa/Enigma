const database = require('../database')

const { getSignatures } = require('../lib')

module.exports = (req, res, next) => {
  const { id } = req.params
  database.removeChallenge(id).then(() => {
    res.json({})
  })
}
