const express = require("express");

const auth = require("../middlewares/auth");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

// const validate = re
const router = express.Router();

router.use(auth);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
