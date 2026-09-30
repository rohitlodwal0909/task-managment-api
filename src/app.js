const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const { corsOrigin } = require("./config/env");

const authRoutes = require("./routes/auth.routes");

const taskRoutes = require("./routes/task.routes");

const notFound = require("./middlewares/notFound");

const errorHandler = require("./middlewares/errorHandler");

const { success } = require("./utils/apiResponse");

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: corsOrigin === "*" ? true : corsOrigin,
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  express.urlencoded({
    extended: false,
    limit: "1mb",
  }),
);

app.get("/health", (req, res) => {
  return success(res, 200, "API is healthy", {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
