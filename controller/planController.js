
const planModel=require("../models/planModel");


module.exports.getAllPlans=async function (req,res){
    try{
    let allPlans=await planModel.find();
    if(allPlans){
        res.json({
            msg:"The plans are ready",
           allPlans
        });
    }
    else {
        //return with apt status code
         res.json({
          msg: "plans not found",
        });
      }
    
    }
    catch(err){
     res.json({
        msg:err.message,
     })
    }
}

module.exports.getPlan=async function (req,res){
    try{
     let planId=req.params.id;//we will get id from frontend
     let plan=await planModel.findById(planId);
    if(plan){
        res.json({
            msg:"Plan retrieved",
            plan
         })
    }
    else {
        //return with apt status code
        res.json({
          msg: "plan not found",
        });
      }
    }
    catch(err){
      res.json({
        msg:err.message,
      })
    }
}

module.exports.top3Plans=async function (req,res){
    try{
        const plans = await planModel.find().sort({ ratingsAverage: -1 }).limit(3);//sort tkaes in the conditon on which we have to to if we give the key as -1 the sorting is done in descending order
        return res.json({
            msg: "top3 plans",
            data:plans
        })
    }
    catch{
        res.json({
            msg:err.message
        })
    }
}

module.exports.createPlan= async function(req,res){
   try{
    let data= req.body;
    let newPlan=await planModel.create(data);
    
        res.json({
            msg:"New plan has been created",
            newPlan
        })
   }
   catch(err){
   res.json({
    err:err.message,
   })
   }
}

module.exports.updatePlan=async function(req,res){
    try{
     let planId=req.params.id;//we will get id from frontend
     
     let planToBeUpdated=req.body;
     let keys=[];
     for(let key in planToBeUpdated){
        keys.push(key);
     }
     let plan= await planModel.findById(planId);
     for(let i=0;i<keys.length;i++){
        plan[keys[i]]=planToBeUpdated[keys[i]];
     }

     await plan.save();


  return res.json({
      msg: "plan updated succesfully",
      plan,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
}

module.exports.deletePlan=async function(req,res){
  try{
   let id=req.params.id;//from frontend
   let deletedPlan = await planModel.findByIdAndDelete(id);
   return res.json({
    msg: "plan deleted succesfully",
    deletedPlan,
  });
}
  catch (err) {
    res.json({
      msg: err.message,
    });
  }
}