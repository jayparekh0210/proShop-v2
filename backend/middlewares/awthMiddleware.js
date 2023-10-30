const jwt = require("jsonwebtoken");
const asyncHandeler = require("./asyncHandeler");
const User = require("../models/userModel");

const protect = asyncHandeler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Unautharised user Token Failed!");
    }
  } else {
    res.status(401);
    throw new Error("Unautharised user No Token!");
  }
});

const admin = asyncHandeler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Unautharised Admin");
  }
});

module.exports = { protect, admin };
