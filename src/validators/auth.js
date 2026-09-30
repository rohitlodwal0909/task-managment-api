const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerValidation,
  loginValidation,
};
