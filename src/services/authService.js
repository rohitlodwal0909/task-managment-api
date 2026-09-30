const User = require("../models/User");
const AppError = require("../utils/appError");
const { signToken } = require("../utils/jwt");

async function register({ name, email, password }) {
  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    throw new AppError("Email is already registered", 409, "EMAIL_EXISTS");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = signToken({
    sub: user._id.toString(),
  });

  return {
    user,
    token,
  };
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  const token = signToken({
    sub: user._id.toString(),
  });

  return {
    user,
    token,
  };
}

async function getProfile(userId) {
  const user = await User.findById(userId).lean();

  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  delete user.password;
  delete user.__v;

  return user;
}

module.exports = {
  register,
  login,
  getProfile,
};
