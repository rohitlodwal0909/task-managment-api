const mongoose = require("mongoose");

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
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
      index: true,
    },

    dueDate: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({
  user: 1,
  status: 1,
  createdAt: -1,
});

taskSchema.index({
  user: 1,
  dueDate: 1,
});

module.exports = mongoose.model("Task", taskSchema);
