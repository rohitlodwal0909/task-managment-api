const express = require("express");

const controller = require("../controllers/taskController");

const validate = require("../middlewares/validate");

const authenticate = require("../middlewares/auth");

const {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  listTasksSchema,
} = require("../validators/taskValidator");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createTaskSchema), controller.create);

router.get("/", validate(listTasksSchema), controller.list);

router.get("/:id", validate(taskIdSchema), controller.getOne);

router.patch("/:id", validate(updateTaskSchema), controller.update);

router.delete("/:id", validate(taskIdSchema), controller.remove);

module.exports = router;
