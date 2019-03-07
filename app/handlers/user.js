const database = require('../database')

module.exports = (req, res, next) => {
  // FOR DEVELOPMENT
  if (global.USER) req.user = global.USER
  //////////////////
  if (req.user) {
    const id = req.user.id
    database.getUserByID(id).then(user => {
      delete user.password
      database.getScore(id).then(score => {
        res.json({ id, ...user, score })
      })
    })
  } else {
    res.json({})
  }
}
