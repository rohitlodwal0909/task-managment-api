const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

// const AppError = require()

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authetication required",
      });
    }
    const token = header.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select("_id name email");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expires token",
    });
  }
};

module.exports = auth;
