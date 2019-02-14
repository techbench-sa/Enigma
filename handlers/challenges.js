const database = require('../database')

module.exports = (req, res, next) => {
  database.getChallenges().then(challenges => {
    res.json(challenges)
  })
}