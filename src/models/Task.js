const mongoose = require("mongoose");
const { timeStamp } = require("node:console");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "hign"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "inprogress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  { timeStamp: true },
);

module.exports = mongoose.model("Task", taskSchema);
