const database = require('../database')

module.exports = (req, res, next) => {
  // FOR DEVELOPMENT
  if (global.USER) req.user = global.USER
  //////////////////
  const id = req.user.id
  database.getChallenges(id).then(challenges => {
    res.json(challenges)
  })
}
