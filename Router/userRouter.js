const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
var jwt = require("jsonwebtoken");
const JWT_KEY = "zdsfxcg234w5e6cg";
userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/setcookies").get(setCookies);

userRouter.route("/getcookies").get(getCookies);

userRouter.route("/:name").get(getUserById);

// let isLoggedIn = false;
//isadmin cookie can be used to identify b/w user and admin 
function protectRoute(req, res, next) { 
  if (req.cookies.login) {
    let token = req.cookies.login;
    let isVerified = jwt.verify(token, JWT_KEY);
    if (isVerified) next();
    else {
      req.json({
        msg:'user not verified'
      })
    }
  } else {
    return res.json({
      msg: "opertion not allowed",
    });
  }
}



module.exports = userRouter;