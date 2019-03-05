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
  const Joi = require('joi')
  const data = req.body
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    lang: Joi.valid('String', ['java', 'python']).required(),
    submission: Joi.string().required()
  })
  Joi.validate(data, schema, async (err, value) => {
    console.log(err)
    if (err) {
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
        console.log(err)
        res.json({ error: 'Unexpected Error...', code: 1 })
      }

      const { response, code } = await compile(
        lang,
        submissionFileDirectory
      ).catch(err => console.log(err))
      if (code === 0) {
        const results = JSON.parse(
          '[' + response.trim().replace(/\n/g, ',') + ']'
        )
        await database.addSubmission({
          player_id: userID,
          challenge_id: challenge.id,
          code: submission,
          score: results.filter(result => result.payload.value).length
        })
        res.json({ results, code })
      } else if (code === 1) {
        res.json({ error: response.replace(/\/.*\//g, ''), code })
      }
    }
  })
}
