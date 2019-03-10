const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const passport = require('./passport')
const app = express()
const port = 3000

const Routes = require('./routes')

// FOR DEVELOPMENT
if (process.argv[2] == 'dev') {
  global.USER = { id: +process.argv[3] || 1 }
  console.log('[dev] logged in with id ' + global.USER.id)
}
//////////////////

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  history({
    rewrites: [{ from: '/logout$', to: '/logout' }]
  })
)

app.use('/', express.static('./dist'))
app.use(
  session({
    secret: '6NwMtfKpv7OZyUdAlkZ6',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

app.use('/', Routes)

// app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' }));

app.listen(port, () => console.log('\033[0;32m' + `[url] http://localhost:${port}` + '\033[0m'))
