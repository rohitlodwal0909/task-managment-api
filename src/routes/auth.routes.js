const express = require("express");

const controller = require("../controllers/auth.controller");

const validate = require("../middlewares/validate");

const authenticate = require("../middlewares/auth");

const { loginLimiter } = require("../middlewares/rateLimiter");

const { registerSchema, loginSchema } = require("../validators/auth");

const router = express.Router();

router.post("/register", validate(registerSchema), controller.register);

router.post("/login", loginLimiter, validate(loginSchema), controller.login);

router.get("/me", authenticate, controller.me);

module.exports = router;
