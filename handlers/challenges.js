const database = require('../database')

module.exports = (req, res, next) => {
  const id = req.user.id
  database.getChallenges(id).then(challenges => {
    res.json(challenges)
  })
}
