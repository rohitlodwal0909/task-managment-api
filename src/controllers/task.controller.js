const jwt = require("jsonwebtoken");

const Task = require("../models/Task");
const {
  createTaskValidation,
  updateTaskValidation,
} = require("../validators/task");
const { title } = require("node:process");
const { default: mongoose } = require("mongoose");

const createTask = async (req, res, next) => {
  try {
    const { error, value } = createTaskValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details(0).message,
      });
    }

    const { name, email, password } = req.body;

    const task = await Task.create({
      ...value,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: {
        user: {
          id: task._id,
          title: user.title,
          status: user.status,
          priority: user.priority,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, status, search } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = { user: req.user._id };
    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $option: "1",
          },
        },
        {
          description: {
            $regex: search,
            $option: "1",
          },
        },
      ];
    }
    const skip = (page - 1) * limit;
    const [tasks, total] = await promiseHooks.all([
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Task.countDocuments(filter),
    ]);

    return res.status(201).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }
    const { error, value } = updateTaskValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details(0).message,
      });
    }

    const { name, email, password } = req.body;

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      { $set: value },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const { name, email, password } = req.body;

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Task deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
