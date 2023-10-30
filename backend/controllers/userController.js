const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandeler");
const bycrpt = require("bcryptjs");
const genrateToken = require("../helper/genrateToken");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const passwordCheck = bycrpt.compareSync(password, user.password);

  if (user && passwordCheck) {
    genrateToken(user, res);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Unautharised User");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("Email Id is already taken!");
  } else {
    const encodedPassword = bycrpt.hashSync(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: encodedPassword,
    });
    if (user) {
      genrateToken(user, res);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ Message: "Log out Sucessfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("No User Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = bycrpt.hashSync(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("No User Found");
  }
});

//@Admin Route only
const getAllUser = asyncHandler(async (req, res) => {
  res.send("get All User profile");
});
//@Admin Route only
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete User profile");
});

//@Admin Route only
const getUser = asyncHandler(async (req, res) => {
  res.send("get User profile");
});

//@Admin Route only
const updateUserByAdmin = asyncHandler(async (req, res) => {
  res.send("Update User profile by Admin");
});
module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUser,
  deleteUser,
  getUser,
  updateUserByAdmin,
};
