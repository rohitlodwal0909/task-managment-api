const taskService = require("../services/taskService");

const { success } = require("../utils/apiResponse");

async function create(req, res) {
  const task = await taskService.createTask(req.user.id, req.body);

  return success(res, 201, "Task created successfully", {
    id: task._id,
    title: task.title,
    status: task.status,
    priority: task.priority,
  });
}

async function list(req, res) {
  const result = await taskService.listTasks(req.user.id, req.query);

  return success(
    res,
    200,
    "Tasks fetched successfully",
    result.items,
    result.pagination,
  );
}

async function getOne(req, res) {
  const task = await taskService.getTask(req.user.id, req.params.id);

  return success(res, 200, "Task fetched successfully", task);
}

async function update(req, res) {
  const task = await taskService.updateTask(
    req.user.id,
    req.params.id,
    req.body,
  );

  return success(res, 200, "Task updated successfully", task);
}

async function remove(req, res) {
  await taskService.deleteTask(req.user.id, req.params.id);

  return success(res, 200, "Task deleted successfully", null);
}

module.exports = {
  create,
  list,
  getOne,
  update,
  remove,
};
