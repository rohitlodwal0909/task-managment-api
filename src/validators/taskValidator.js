const Joi = require("joi");

const objectId = Joi.string().hex().length(24);

const createTaskSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().trim().min(1).max(200).required().messages({
      "string.empty": "Title is required",
    }),

    description: Joi.string().trim().max(5000).allow("").default(""),

    priority: Joi.string().valid("low", "medium", "high").default("medium"),

    status: Joi.string()
      .valid("pending", "in_progress", "completed")
      .default("pending"),

    dueDate: Joi.date().iso().allow(null).default(null),
  }).required(),

  params: Joi.object().required(),

  query: Joi.object().required(),
});

const updateTaskSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().trim().min(1).max(200),

    description: Joi.string().trim().max(5000).allow(""),

    priority: Joi.string().valid("low", "medium", "high"),

    status: Joi.string().valid("pending", "in_progress", "completed"),

    dueDate: Joi.date().iso().allow(null),
  })
    .min(1)
    .required(),

  params: Joi.object({
    id: objectId.required(),
  }).required(),

  query: Joi.object().required(),
});

const taskIdSchema = Joi.object({
  body: Joi.object().required(),

  params: Joi.object({
    id: objectId.required(),
  }).required(),

  query: Joi.object().required(),
});

const listTasksSchema = Joi.object({
  body: Joi.object().required(),

  params: Joi.object().required(),

  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),

    limit: Joi.number().integer().min(1).max(100).default(10),

    status: Joi.string().valid("pending", "in_progress", "completed"),

    search: Joi.string().trim().max(100).allow(""),

    sortBy: Joi.string()
      .valid("createdAt", "dueDate", "title")
      .default("createdAt"),

    sortOrder: Joi.string().valid("asc", "desc").default("desc"),
  }).required(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  listTasksSchema,
};
