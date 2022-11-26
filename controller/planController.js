const { isAuthorised } = require("../helper");
const planModel=require("../models/planModel");


module.exports.getAllPlans=async function (req,res){
    try{
    let allPlans=await planModel.find()
    res.json({
        msg:"The plans are ready",
       allPlans
    });
    }
    catch(err){
     res.json({
        msg:err.message,
     })
    }
}

module.exports.getPlan=async function (req,res){
    try{
     let planId=req.id;
     let plan=await planModel.findById(planId);
     res.json({
        msg:"Plan retrieved",
        plan
     })
    }
    catch(err){
      res.json({
        msg:err.message,
      })
    }
}

// module.exports.top3Plans=async function (req,res){
//     try{

//     }
//     catch{

//     }
// }

module.exports.createPlan= async function(req,res){
   try{
    let data= req.body;
    let newPlan=await planModel.create(data);
    if(newPlan){
        res.json({
            msg:"New plan has been created",
            newPlan
        })
    }
    else{
        res.json({
            msg:"Plan could not be created"
        })
    }
   }
   catch(err){
   res.json({
    err:err.message,
   })
   }
}

module.exports.updatePlan=async function(req,res){
    try{
     let planId=req.id;
     let planToBeUpdates=await planModel.findById(planId);
    
    }
    catch(err){

    }
}

module.exports.deletePlan=function(req,res){
  
}