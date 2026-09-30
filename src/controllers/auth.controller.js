const authService = require("../services/authService");

const { success } = require("../utils/apiResponse");

async function register(req, res) {
  const result = await authService.register(req.body);

  return success(res, 201, "User registered successfully", {
    user: result.user,
    token: result.token,
  });
}

async function login(req, res) {
  const result = await authService.login(req.body);

  return success(res, 200, "Login successful", {
    user: result.user,
    token: result.token,
  });
}

async function me(req, res) {
  const user = await authService.getProfile(req.user.id);

  return success(res, 200, "Profile fetched successfully", user);
}

module.exports = {
  register,
  login,
  me,
};
