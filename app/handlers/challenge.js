const database = require('../database')

const { getSignatures } = require('../lib')

module.exports = (req, res, next) => {
  // FOR DEVELOPMENT
  if (global.USER) req.user = global.USER
  //////////////////
  const { id } = req.params
  database.getChallenge(id).then(challenge => {
    res.json({ ...challenge, signatures: getSignatures(challenge) })
  })
}
