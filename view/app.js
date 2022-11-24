const express = require("express");
const app = express();
const mongoose=require("mongoose")
const {db_link}=require('./secrets');
const emailValidator=require("email-validator")
const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

//install the follwoing pacakge to use cookies
const cookieParser=require('cookie-parser')
app.use(express.json());
app.use(cookieParser());//this step is impo to use cookie parser



app.use("/user", userRouter);
app.use("/auth", authRouter);






authRouter.route("/signup").get(getSignup).post(postSignup);
//with query
// app.get('/user', )

// app.post('/user', );

// app.patch('/user', );

// app.delete('/user', )

//params
// app.get('/user/:name', );








//always use try catch to show so that errors are shown on the frontend too

X


app.listen(5000);

mongoose.connect(db_link).then(function(db){
console.log("db connected")
})
.catch( function(err){
    console.log(err)
})



//creating schema
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },

})

//models
const userModel = mongoose.model("userModel", userSchema);

// (async function createUser() {
//     let user = {
//         name: "Rajesh",
//         email: "xyz@gmail.com",
//         password: "12345678",
//         confirmPassword: "12345678"
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();