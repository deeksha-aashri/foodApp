const express = require('express');
const bookingRouter = express.Router();
const { protectRoute } = require('../helper');
const { createSession } = require('../controller/bookingController');
bookingRouter.use(express.static("public"));
bookingRouter

                 // <<<<doubt


            .route('/createsession')
            .get(function (req, res) {
  //  res.sendFile("C:/User/deeks/Desktop/Web Development/backend/foodApp/public/index.html");
  res.sendFile('./public/booking.html',{root:__dirname})
});
// bookingRouter.use(protectRoute);
bookingRouter
           .route('/createsession')
           .post(createSession);

module.exports = bookingRouter;