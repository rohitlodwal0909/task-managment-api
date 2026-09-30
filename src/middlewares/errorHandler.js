const { nodeEnv } = require("../config/env");
const { failure } = require("../utils/apiResponse");

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;

  let message = err.message || "Internal server error";

  let errors = err.details;

  // Mongoose validation
  if (err.name === "ValidationError") {
    statusCode = 400;

    message = "Database validation failed";

    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  }

  // Invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;

    message = `Invalid ${err.path}`;
  }

  // Duplicate MongoDB key
  if (err.code === 11000) {
    statusCode = 409;

    message = "A record with the same unique value already exists";

    errors = Object.keys(err.keyPattern || {}).map((field) => ({
      field,
      message: `${field} already exists`,
    }));
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired authentication token";
  }

  if (nodeEnv !== "production") {
    console.error(err);
  } else if (statusCode >= 500) {
    console.error(err.message);
  }

  return failure(res, statusCode, message, errors);
}

module.exports = errorHandler;
