const express=require('express');
const planRouter=express.Router();

planRouter
          .route('/all')//anyone can access this plan
          .get(getAllPlans);

 planRouter
         .route('/top3')
         .get(top3Plans);

//only logged in people can access
planRouter.use(protectRoute)         
planRouter
         .route('/single/:id')
         .get(getPlan);

         //only admin can do the following

planRouter.use(isAuthorised(['admin', 'restaurantowner'])) // logged in , lekin role 
planRouter
    .route("/crud")
    .post(createPlan);
planRouter
         .route('/crud/:id')//will the the id from frontend using req.params
         .patch(updatePlan)
         .delete(deletePlan)



module.exports=planRouter;