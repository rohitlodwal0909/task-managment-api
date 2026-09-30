const Joi = require("joi");

const createTaskValidation = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(500).allow(""),
  priority: Joi.string().valid("low", "medium", "high"),
  status: Joi.string().valid("pending", "inprogress", "completed"),
  dueDate: Joi.date().iso().allow(null),
});

const updateTaskValidation = Joi.object({
  title: Joi.string().min(1).max(200),
  description: Joi.string().max(500).allow(""),
  priority: Joi.string().valid("low", "medium", "high"),
  status: Joi.string().valid("pending", "inprogress", "completed"),
  dueDate: Joi.date().iso().allow(null),
});

module.exports = {
  createTaskValidation,
  updateTaskValidation,
};
