
const reviewModel=require('../models/reviewModel')

module.exports.getAllReviews=async function(req,res){
try{
  let allReviews=await reviewModel.find();
  if(allReviews){
    res.json({
        msg:"All reviews are ready",
        allReviews
    })
  }
  else{
    res.json({
        msg:"Reviews not found"
    })
  }
}
catch(err){
    msg:err.message

}
}

module.exports.top3reviews=async function(req,res){
try{
const reviews=await reviewModel.find().sort({rating:-1}).limit(3);
res.json({
    msg:"Top 3 reviews found", reviews
})
}
catch(err){
    res.json({
        msg:err.message
    })

}
}

module.exports.getPlanReview=async function(req,res){
    try{
     let id=req.params.id;//from frontend
     let review=await reviewModel.findById(id);
     if(review){
        res.json({
            msg:"Review retrieved",
            review
        })
     }
     else{
        res.json({
            msg:"Review not found"
        })
     }
    }
    catch(err){
        res.json({
            msg:err.message
        })
    
    }
}

module.exports.createReview=async function (req,res){
try{
    let data= req.body;
    let review= await reviewModel.create(data);
    res.json({
        msg:"Review added", review
    })
}
catch(err){
  res.json({
    msg:err.message,
  })
}
   

}


module.exports.updateReview=async function (req,res){
try{
let reviewId=req.params.id;
let reviewToBeUpdated=req.body;

let keys=[];
for(let key in reviewToBeUpdated){
    keys.push(key);
}
let review=await reviewModel.findById(reviewId);
for(let i=0;i<keys.length;i++){
   reviewModel[keys[i]] =reviewToBeUpdated[keys[i]]
}
await review.save();
res.json({
    msg: "plan updated succesfully",
    plan,
  });
}
catch(err){
    res.json({
        msg: err.message,
      });
}
}


module.exports.deleteReview=async function (req,res){
    try{
        let id=req.params.id;//from frontend
        let deletedReview = await reviewModel.findByIdAndDelete(id);
        return res.json({
         msg: "review deleted succesfully",
         deletedReview,
       });
     }
       catch (err) {
         res.json({
           msg: err.message,
         });
       }
}


