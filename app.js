const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const passport = require('./passport')
const app = express()
const port = 3000

const Routes = require('./routes')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(history())
app.use('/', express.static('../hackathon-system/dist'))
app.use(session({ secret: 'passport-tutorial', resave: false, saveUninitialized: false }));
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

app.use('/', Routes)

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))