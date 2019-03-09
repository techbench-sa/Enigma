const database = require('../database')

module.exports = (req, res, next) => {
  const { id, type } = req.body
  database.changeUserType(id, type).then(user => {
    console.log('tesssst')
    res.json({})
  })
}
