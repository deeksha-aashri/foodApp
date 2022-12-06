const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.static('public/build'));
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// // var whitelist='http://localhost:3000/'

// app.options('*', cors())//to allow preflight

const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter=require("./Routers/bookingRouter")

app.use("/user", userRouter);
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
app.use("/booking",bookingRouter);

const port = process.env.PORT || 5000;
app.listen(port);