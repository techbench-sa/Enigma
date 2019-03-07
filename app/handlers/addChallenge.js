const database = require('../database')

module.exports = (req, res, next) => {
  // FOR DEVELOPMENT
  if (global.USER) req.user = global.USER
  //////////////////
  const Joi = require('joi')
  const data = req.body
  const schema = Joi.object().keys({
    challenge: Joi.object({
      name: Joi.string()
        .required()
        .error(err => 'Challenge name is required.'),
      description: Joi.string()
        .required()
        .error(err => 'Challenge description is required.'),
      score: Joi.number()
        .required()
        .error(err => 'Score is required and has to be a number.')
    }),
    method: Joi.object({
      name: Joi.string()
        .required()
        .error(err => 'Method name is required.'),
      type: Joi.valid('String', [
        'Integer',
        'String',
        'Double',
        'Boolean',
        'Char'
      ]).required()
    }),
    tests: Joi.object({
      inputs: Joi.array(),
      outputs: Joi.array()
    }),
    params: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          type: Joi.valid('String', [
            'Integer',
            'String',
            'Double',
            'Boolean',
            'Char'
          ]).required()
        })
      )
      .error(err => 'Paremeters are required.')
  })

  Joi.validate(data, schema, async (err, value) => {
    if (err) {
      res.status(422).json({
        status: 'error',
        message: err.details
      })
    } else {
      database.addChallenge(value).then(id => res.json(id))
    }
  })
}
