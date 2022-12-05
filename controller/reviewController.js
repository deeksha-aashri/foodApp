
const planModel = require('../models/planModel');
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
     let planId=req.params.id;//from frontend
     let reviews = await reviewModel.find();
    //  console.log("Reviews "+reviews)
     console.log(Array.isArray (reviews))
    reviews = reviews.filter(review => {

      // --------------------->DOUBT

      //  let Idfromarr=review.plan["_id"].toString()
      
      return  review.plan["_id"]== planId});
     
      console.log("Filtered Reviews "+reviews)
     if( reviews){
        res.json({
            msg:"Review retrieved",
            reviews
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
  //we should know the plan to whih this review belongs
  const planId=req.params.id;//params since when we click on the plan we land on a page to create review
  const plan =await planModel.findById(planId);
  let user=req.id
  console.log("type is ",typeof user)
  console.log(req.body)
  
  console.log("The user id is",user)
  console.log("The plan id is",planId)
  const data=await req.body;//data=review lies in req's body
    let review= await reviewModel.create(data);
    //updating the average rating of the plan
    console.log(data)
    plan.ratingsAverage=(plan.ratingsAverage*plan.nor+req.body.rating)/(plan.nor+1);
    plan.nor+=1;
    console.log("review ready")
    await plan.save();
    await review.save();
    return res.json({
        msg:"Review added", review
    })
}
catch(err){
  res.status(500).json({
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
        let planId=req.params.id;//from frontend
        let reviewId=req.body.id;
        console.log("The review to be deleted is", reviewId)
        console.log("The req obj is", req.body);
        //change average rating of plan
        let plan=await planModel.findById(planId);
    
        plan.ratingsAverage=(plan.ratingsAverage*plan.nor - req.body.rating)/ (plan.nor -1);
        plan.nor-=1;
        await plan.save();
        let deletedReview = await reviewModel.findByIdAndDelete(reviewId);
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


