const mongoose = require("mongoose");
const { db_link } = require("../secrets");

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log(" review db connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

 const reviewSchema=   mongoose.Schema({
    review:{
   type:"String",
   required:[true, "Review is required"],
   maxLength:[240,"Character limit of 240 has been exceeded"]
    },
    rating:{
     type:"Number",
     required:[true,"Rating is required"],
     min:0,
     max:5

    },
    time:{
     type:Date,
     default:Date.now(),//gets epoch time lapsed from 1st jan 1970
    },
    user:{
     type:mongoose.Schema.ObjectId,
     ref:"userModel",
     required:[true, "User should be logged in"]
    },
    plan:{
        type:mongoose.Schema.ObjectId,
     ref:"planModel",
     required:[true, "Plan must belong to a user"],
    }

  })

//  /^find / is a regular exp(regex) so any input which contains find (findbyid, findone , findoneandupdate )  will work as follows
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',  //fills the user field in reviewschema
        select: "name profileImage" //with these two fields from refernced model 
    }).populate("plan");
    next();
})

const reviewModel = mongoose.model("reviewModel", reviewSchema);

  module.exports=reviewModel;
