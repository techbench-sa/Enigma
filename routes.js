const express = require('express')
const router = express.Router()


const fs = require('fs')
const path = require('path')

const database = require('./database')

const userHandler = require('./handlers/user')
const challengesHandler = require('./handlers/challenges')
const challengeHandler = require('./handlers/challenge')
const solveChallengeHandler = require('./handlers/solveChallenge')
const addChallengeHandler = require('./handlers/addChallenge')

// generic route handler
const genericHandler = (req, res, next) => {
    res.json({
        status: 'success',
        data: req.body
    });
};

function isUserAuthenticated(req, res, next) {
  if (req.user) {
  next()
  } else {
    res.status(401).json({error: 'not logged in!'})
  }
}

router.get('/', isUserAuthenticated, (req, res) => {
    console.log('tests')
})

router.get('/api/user', userHandler)

router.get('/api/challenges', isUserAuthenticated, challengesHandler)

router.get('/api/challenge/:id', isUserAuthenticated, challengeHandler)

router.post('/api/submit', isUserAuthenticated,solveChallengeHandler)

router.post("/api/addChallenge", isUserAuthenticated, addChallengeHandler)

module.exports = router;