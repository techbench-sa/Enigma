const database = require('../database')

module.exports = (req, res, next) => {
  if (req.user) {
    const id = req.user.id
    database.getUserByID(id).then(user => {
      database.getScore(id).then(score => {
        console.log(score)
        res.json({id, username: user.username, score})
      })
    })
  } else {
    res.json({})
  }
}