const express = require("express");
const userRouter = express.Router();
const { getUser, postUser, updateUser, deleteUser, getAllUser} = require("../controller/userController");
const {isAuthorised,protectRoute} = require('../helper');
const { signup, login, forgetpassword, resetpassword, logout } = require('../controller/authController');

//user ke options
userRouter
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)

userRouter
  .route("/login")
  .post(login);

userRouter
  .route("/signup")
  .post(signup);

  userRouter.route("/forgetpassword").post(forgetpassword);
  userRouter.route("/resetpassword/:token").post(resetpassword);

  userRouter
  .route("/logout")
  .post(logout);
//profile page
userRouter.use(protectRoute)
userRouter
  .route('/userprofile')
  .get(getUser)

//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter.route('')
.get(allUser)


module.exports = userRouter;