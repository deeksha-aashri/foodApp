const express=require('express');
const planRouter=express.Router();

planRouter
          .route('/all')//anyone can access this plan
          .get(getAllPlans);


//only logged in people can access
planRouter.use(protectRoute)         
planRouter
         .route('/single/:id')
         .get(getPlan);

planRouter.use(isAuthorised(['admin','restaurantowner'])) // logged in , lekin role 
planRouter//only admin can do it
         .route('/crudplan')
         .post(createPlan)
         .patch(updatePlan)
         .delete(deletePlan)

planRouter
         .route('/top3')
         .get(top3Plans);

module.exports=planRouter;