const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/jwt");

function authenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new AppError("Authentication token is required", 401, "UNAUTHORIZED"),
    );
  }

  const token = authorization.split(" ")[1];

  try {
    const payload = verifyToken(token);

    req.user = {
      id: payload.sub,
    };

    next();
  } catch (error) {
    return next(
      new AppError(
        "Invalid or expired authentication token",
        401,
        "UNAUTHORIZED",
      ),
    );
  }
}

module.exports = authenticate;
