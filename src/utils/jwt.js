const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

const signToken = (userId) => {
  return jwt.sign({
    sub: userId.toString(),
  });
  (jwtsecret,
    {
      expiresIn: "1d",
    });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtsecret);
};

module.exports = {
  signToken,
  verifyToken,
};
