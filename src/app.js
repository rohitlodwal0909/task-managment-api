require("dotenv");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
// app.use(errorHan)
app.use(express.urlencoded({ extended: false }));

module.exports = app;
