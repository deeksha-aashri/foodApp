var jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");
const { JWT_KEY } = require("./secrets");

//protectRoute
module.exports.protectRoute = async function (req, res, next) {
    let token;
    if (req.cookies.login) {
       token = req.cookies.login;
     
     
      let payloadObj = jwt.verify(token, JWT_KEY);
      const user = await userModel.findById(payloadObj.payload);
      req.id = user.id;
      req.role = user.role;
      console.log(payloadObj)
      if (payloadObj) {
        next();
        return;
      }
      else {
         req.json({
            msg: "user not verified",
      });
    }
  } else {
    return res.json({
      msg: "operation not allowed",
    });
  }
};

//isAutorised will check the user's role
// client will send role key in req obj
module.exports.isAuthorised = function (roles) {
  console.log("The roles are", roles)
  return function (req, res, next) {
    let role = req.role;
    if (roles.includes(role)) {
      next();
      // return;
    }
    else{
      res.status(401).json({
        msg: "User not authorized to perform this operation",
      });
    }
   
  };
};