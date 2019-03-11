const fs = require('fs')
const path = require('path')
const {
  createFolder,
  generateSubmission,
  getExtension,
  compile
} = require('../lib')

const database = require('../database')

module.exports = (req, res, next) => {
  // FOR DEVELOPMENT
  if (global.USER) req.user = global.USER
  //////////////////
  const Joi = require('joi')
  const data = req.body
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    lang: Joi.valid('String', ['java', 'python']).required(),
    submission: Joi.string().required()
  })
  Joi.validate(data, schema, async (err, value) => {
    if (err) {
      console.error('\033[0;31m[err] solveChallenge.js:24\033[0m')
      console.log(err)
      res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
      })
    } else {
      const userID = req.user.id
      const { id, lang, submission } = value
      const challenge = await database.getChallenge(id)
      const usersFolderDirectory = path.join(__dirname, '../users')
      await createFolder(usersFolderDirectory)

      const userFolderDirectory = path.join(
        usersFolderDirectory,
        `${req.user.id}`
      )
      await createFolder(userFolderDirectory)

      const submissionFileDirectory = path.join(
        userFolderDirectory,
        `/Challenge_${challenge.id}.${getExtension(lang)}`
      )
      try {
        await fs.writeFileSync(
          submissionFileDirectory,
          generateSubmission(lang, challenge, submission)
        )
      } catch (err) {
        console.error('\033[0;31m[err] solveChallenge.js:55\033[0m')
        console.log(err)
        res.json({ error: 'Unexpected Error...', code: 1 })
      }

      const { response, code } = await compile(
        lang,
        submissionFileDirectory
      ).catch(err => {
        console.error('\033[0;31m[err] solveChallenge.js:64\033[0m')
        console.log(err)
      })
      if (code === 0) {
        let results
        try {
          results = JSON.parse(
            '[' + `${response}`.trim().replace(/\n/g, ',') + ']'
          )
        } catch (e) {
          console.error('\033[0;31m[err] solveChallenge.js:73\033[0m')
          console.log(response)
          res.json({ error: 'Unexpected Error...', code: 1 })
        }
        const score = results.filter(result => result.payload.value).length
        await database.addSubmission({
          player_id: userID,
          challenge_id: challenge.id,
          code: submission,
          is_solved: challenge.points === score,
          score,
          lang
        })
        res.json({ results, code })
      } else if (code === 1) {

        res.json({ error: response.replace(/\/.*\//g, ''), code })
      }
    }
  })
}
