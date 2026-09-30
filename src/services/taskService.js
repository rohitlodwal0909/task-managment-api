const mongoose = require("mongoose");

const Task = require("../models/Task");

const AppError = require("../utils/appError");

function ensureObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid task id", 400, "INVALID_ID");
  }
}

async function createTask(userId, payload) {
  return Task.create({
    ...payload,

    user: userId,
  });
}

async function listTasks(userId, query) {
  const { page, limit, status, search, sortBy, sortOrder } = query;

  const filter = {
    user: userId,
  };

  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const [items, total] = await Promise.all([
    Task.find(filter)
      .select("-__v")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),

    Task.countDocuments(filter),
  ]);

  return {
    items,

    pagination: {
      page,
      limit,
      total,

      totalPages: Math.ceil(total / limit),

      hasNextPage: page * limit < total,

      hasPreviousPage: page > 1,
    },
  };
}

async function getTask(userId, taskId) {
  ensureObjectId(taskId);

  const task = await Task.findOne({
    _id: taskId,

    // IMPORTANT:
    // Ownership check
    user: userId,
  })
    .select("-__v")
    .lean();

  if (!task) {
    throw new AppError("Task not found", 404, "TASK_NOT_FOUND");
  }

  return task;
}

async function updateTask(userId, taskId, payload) {
  ensureObjectId(taskId);

  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,

      // IMPORTANT:
      // Ownership check
      user: userId,
    },

    {
      $set: payload,
    },

    {
      new: true,
      runValidators: true,
    },
  )
    .select("-__v")
    .lean();

  if (!task) {
    throw new AppError("Task not found", 404, "TASK_NOT_FOUND");
  }

  return task;
}

async function deleteTask(userId, taskId) {
  ensureObjectId(taskId);

  const task = await Task.findOneAndDelete({
    _id: taskId,

    // IMPORTANT:
    // Ownership check
    user: userId,
  })
    .select("-__v")
    .lean();

  if (!task) {
    throw new AppError("Task not found", 404, "TASK_NOT_FOUND");
  }

  return task;
}

module.exports = {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask,
};
