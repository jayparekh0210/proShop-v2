const Express = require("express");
const { admin, protect } = require("../middlewares/awthMiddleware");

const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUser,
  deleteUser,
  getUser,
  updateUserByAdmin,
} = require("../controllers/userController");

const UserRouter = Express.Router();

UserRouter.route("/").post(registerUser).get(protect, admin, getAllUser);
UserRouter.route("/logout").post(logoutUser);
UserRouter.route("/login").post(authUser);
UserRouter.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
UserRouter.route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUser)
  .put(protect, admin, updateUserByAdmin);
module.exports = UserRouter;
