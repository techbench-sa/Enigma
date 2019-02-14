const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const database = require('./database')

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  database.getUserByID(id).then((res) => {
    done(null, {id, username: res.username})
  }).catch(err => {
    done({})
  })
})

passport.use('local', new LocalStrategy((username, password, done) =>  {
    database.getUserByUsername(username).then((res) => {
      if (password != res.password)
        return done(null, false, { message: 'Incorrect password.' })
      return done(null, {id: res.id, username})
    }).catch(err => {
      return done(null, false, { message: 'Incorrect username.' })
    })
}))

module.exports = passport