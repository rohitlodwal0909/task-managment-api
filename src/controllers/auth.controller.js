const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validators/auth");

const register = async (req, res, next) => {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details(0).message,
      });
    }

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exites",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: "User registers successfully",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          emai: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = loginValidationValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details(0).message,
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: "Login successfully",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          emai: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
