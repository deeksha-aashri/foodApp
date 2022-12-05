const userModel = require("../models/userModel");
var jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../secrets");
const { sendMail } = require('../utility/nodemailer')

module.exports.signup=async function (req, res) {
  try {
    let data = req.body; //name, email, password
      let user = await userModel.create(data);
      if (user) {
        await sendMail("signup",user)
          res.json({
            msg: "user signed up",
            user,
          });
      }
      else {
          res.json({
            msg: "user could not be signed up"
          });
      }
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
}

module.exports.login=async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      //check if password matches
      //bcrypt - compare
      if (password == user.password) {
        let uid = user["_id"];
        var token = jwt.sign({ payload: uid }, JWT_KEY);
        res.cookie("login", token);
        res.json({
          msg: "user logged in",
        });
      } else {
        res.json({
          msg: "wrong credentials",
        });
      }
    } else {
      res.json({
        msg: "user not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
}

module.exports.forgotpassword=async function (req,res){
    try{
    let {email}=req.body;//We get it from the frontend
    const user= await userModel.findOne({email:email});//The user against this email
    if(user){//if such a user exists
        //resetToken generation
        const resetToken=await user.createResetToken();//this method will be assigned to the user doc using mongoose methods right now assume we have such a function already so using it

        //create reset link which will be sent to the eamil id
        let resetPasswordLink = `${req.protocol}://${req.get('host')}/user/resetpassword/${resetToken}`;
    console.log(resetPasswordLink)
        //send the email with this link using nodemailer
        await sendMail("forgotpassword",{email,resetPasswordLink});
     res.json({
      msg:"A link to reset your password has been emailed"
     })

    }
    else{
        res.json({
            msg:'user not found'
          })
    }
    }
    catch (err) {
        res.status(500).json({//setting error sta=500 since err can occur if db is down and .findone has not been able to work
          msg: err.message
        });
      }
}


module.exports.resetpassword=async function(req,res){
try{
  const token =req.params.token;//.params since on the route of resetpass we have used ":" meaning parameters
 let {password, confirmPassword}=req.body;
 const user = await userModel.findOne({ resetToken: token });
 if (user) {
    //resetPasswordHandler will update user in db assume that we have written this fun. we will write it in userSchema in usermodel.js 
    user.resetPasswordHandler(password, confirmPassword);
    await user.save();
    res.json({
      msg: "password changed succesfully",
    });
  }
  else{
    res.json({
      msg: "user not found",
    });
  }
}
catch(err){
    res.json({
        msg:err.message
      })
}
}


module.exports.logout=function(req,res){
    res.cookie('login',' ', {maxAge:1})//setting login cookie as blank for one milisecond so it expires then
    res.json({
        msg:"User has logged out successfully"
    })
}


