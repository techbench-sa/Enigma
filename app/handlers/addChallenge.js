const Joi = require('joi')
const database = require('../database')

module.exports = ({ user, body: data }, res, next) => {
  // FOR DEVELOPMENT
  if (global.USER) user = global.USER
  //////////////////
  const dataTypes = [
    'Integer',
    'String',
    'Double',
    'Boolean',
    'Char',
    'Integer Array',
    'String Array',
    'Double Array',
    'Boolean Array',
    'Char Array'
  ]
  
  const schema = Joi.object().keys({
    challenge: Joi.object({
      name: Joi.string().required().error(err => 'Challenge name is required.'),
      description: Joi.string().required().error(err => 'Challenge description is required.'),
      score: Joi.number().required().error(err => 'Score is required and has to be a number.')
    }),
    method: Joi.object({
      name: Joi.string().required().error(err => 'Method name is required.'),
      type: Joi.valid('String', dataTypes).required()
    }),
    tests: Joi.object({
      inputs: Joi.array().min(1),
      outputs: Joi.array().min(1)
    }),
    params: Joi.array().min(1).items(
      Joi.object({
        name: Joi.string().required(),
        type: Joi.valid('String', dataTypes).required()
      })
    )
    .error(err => 'Paremeters are required.')
  })

  Joi.validate(data, schema, async (err, value) => {
    if (err) {
      console.log(err)
      res.status(422).json({
        status: 'error',
        message: err.details[0].message
      })
    } else {
      console.log('========================================')
      console.log(value)
      database.addChallenge(value).then(id => res.json(id))
    }
  })

}