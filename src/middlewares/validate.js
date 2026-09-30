const AppError = require("../utils/appError");

function validate(schema) {
  return (req, res, next) => {
    const data = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: false,
    });

    if (error) {
      const errors = error.details.map((item) => ({
        field: item.path.join("."),
        message: item.message,
      }));

      return next(
        new AppError(
          "Request validation failed",
          400,
          "VALIDATION_ERROR",
          errors,
        ),
      );
    }

    req.body = value.body;
    req.params = value.params;
    req.query = value.query;

    next();
  };
}

module.exports = validate;
