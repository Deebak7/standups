const { body } = require("express-validator");


const listnerValidation={
  createListner:[
    body('email').trim().isString().isEmail().withMessage('email is invalid'),
    body('password').trim().isString().withMessage('password is invalid')
  ]
}
module.exports.listnerValidation=listnerValidation;