const Joi = require('joi')
const crypto = require('crypto')
const database = require('../database')

module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .required()
      .regex(/^[a-z\d\s\-\.\,']*$/i)
      .min(4)
      .max(25)
      .error(err => {
        switch(err[0].type) {
          case 'string.min': return 'Name should be longer than 4 letters'
          case 'string.max': return 'Name should not be longer than 25 letters'
          case 'string.regex.base': return 'Name should only contain letters'
          default: return 'Name is required'
        }
      }),
    email: Joi.string()
      .email()
      .required()
      .error(err => 'Email is required.'),
    phoneNumber: Joi.string()
      .regex(/^[a-z\d\s\-\.\,']*$/i)
      .min(9)
      .max(21)
      .required()
      .error(err => 'Phone number is required.'),
    username: Joi.string()
      .required()
      .alphanum()
      .min(4)
      .max(16)
      .error(err => {
        switch(err[0].type) {
          case 'string.min': return 'Username should be longer than 4 letters'
          case 'string.max': return 'Username should not be longer than 16 letters'
          case 'string.alphanum': return 'Username should only contain letters and numbers'
          default: return 'Username is required'
        }
      }),
    gender: Joi.valid('String', ['male', 'female'])
      .required()
      .error(err => 'Gender is required.'),
    password: Joi.string()
      .required()
      .min(8)
      // .regex(/\w*[a-zA-Z]\w*/i)
      // .regex(/\w*[0-9]\w*/i)
      .regex(/^[A-Za-z\d@$!%*#?&\(\)-]*$/i)
      .max(32)
      .error(err => {
        switch(err[0].type) {
          case 'string.min': return 'Password should be longer than 8 characters'
          case 'string.max': return 'Username should not be longer than 32 characters'
          case 'string.regex.base': return 'Password should not contain invalid special characters'
          // case 'string.regex.base': switch (String(err[0].context.pattern)) {
          //   case '/\\w*[a-zA-Z]\\w*/i': return 'Password should contain at least one letter'
          //   case '/\\w*[0-9]\\w*/i': return 'Password should contain at least one number'
          //   case '/^[A-Za-z\\d@$!%*#?&\\(\\)-]*$/i': return 'Password should not contain invalid special characters'
          // }
          default: return 'Password is required'
        }
      }),
    verifyPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .error(err => {
        switch(err[0].type) {
          case 'any.empty': return 'Password verification is required'
          case 'any.allowOnly': return 'Password and Password verification does not match'
          default: return err[0].type
        }
      }),
    token: Joi.string()
      .required()
      .min(32)
      .max(32)
      .error(err => {
        switch(err[0].type) {
          case 'string.min':
          case 'string.max': return 'Token has to be exactly 32 characters long'
          default: return 'Token is required'
        }
      })
  })

  Joi.validate(req.body, schema, async (err, value) => {
    if (err) {
      res.redirect(303, '/register?type=error&message=' + err.details[0].message)
    } else {
      const { name, email, phoneNumber, username, password, gender, token } = value
      const hashed = crypto.createHash('sha256').update(password).digest('base64')
      database
        .getUserByUsername(username)
        .then(user => {
          console.log(user)
          if (user.id) {
            res.redirect(303, '/register?type=error&message=Username is already taken')
          } else {
            return database.registerUser({
              name, email, phoneNumber, username, password: hashed, gender: gender == 'male', token
            }).then(result => {
              if (result.rowCount === 0)
                res.redirect(303, '/register?type=error&message=Token is already used!')
              else
                res.redirect(303, '/register?type=success&message=You have been registered!')
            })
          }
        })
        .catch(err => {
          console.log(err)
          res.redirect(303, '/register?type=error&message=Failed to connect to the server.')
        })
    }
  })
}
