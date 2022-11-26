const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const planModel = require("./models/planModel");
app.use(express.json());
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(5000);