const database = require('../database')

const { getSignatures } = require('../lib')

module.exports = (req, res, next) => {
  const { id } = req.params
  database.getChallenge(id).then(challenge => {
    res.json({ ...challenge, signatures: getSignatures(challenge) })
  })
}
