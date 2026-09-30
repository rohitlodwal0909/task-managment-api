function success(res, statusCode, message, data = null, meta = undefined) {
  const response = {
    success: true,
    message,
    data,
  };

  if (meta !== undefined) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
}

function failure(res, statusCode, message, errors = undefined) {
  const response = {
    success: false,
    message,
  };

  if (errors !== undefined) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
}

module.exports = {
  success,
  failure,
};
