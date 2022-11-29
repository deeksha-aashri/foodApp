const express=require("express");
const reviewRouter=express.Router();

const {isAuthorised, protectRoute}=require('../helper');
const userRouter = require("./userRouter");
const { getAllReviews, top3reviews, getPlanReview, createReview, updateReview, deleteReview } = require("../controller/reviewController");
reviewRouter
           .route('/top3') 
           .get(top3reviews);


reviewRouter
           .route('/all') 
           .get(getAllReviews);



 userRouter.use(protectRoute)
reviewRouter
           .route('/create/:id')
           .post(createReview);


reviewRouter
           .route('/update/:id') 
           .patch(updateReview);

reviewRouter
           .route('/delete/:id') 
           .delete(deleteReview);

           
reviewRouter
           .route('/:id') 
           .get(getPlanReview);

module.exports=reviewRouter;