const database = require('../database')

module.exports = (req, res, next) => {

  database.getTokens().then(tokens => {
    res.json(tokens)
  })
}
