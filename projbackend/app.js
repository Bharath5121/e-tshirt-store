//whenever npm start gives an error go to cmd run as admin than netstat -ano gives you the list of active ports 
//than taskkill /pid --/f
//next question that comes to your mind is why.env file we use.env file to make our application more secure
//and we store sensitive information such as urls,database admin,passwords and we import them into our file by just saying process.env.theNameOverThere



const mongoose = require('mongoose');
require("dotenv").config()//for process.env variable
const express = require('express');// we need express because it is the module that is used for listening at a specified port
const bodyParser=require("body-parser");//for parsing the request from the front end body
const cookieParser =require("cookie-parser");//for parsing cokkies i.e is to set acookie or get a cookie
const cors =require("cors");

//my routes
const authenticationRoutes =require("./routes/authentication.js");//here ./ means from the current directory goes into the routes directory and the file is authentication.js
const userHandlingRoutes =require("./routes/userHandling.js");
const collectionRoutes=require("./routes/collection.js");
const productRoutes=require("./routes/productHandling.js");
const orderRoutes =require("./routes/orderHandling.js");
const app =express();

//DB CONNECTION

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED")
});
//  the connect method is similar to run method if the run method is executing properly than then is excuted

//next we need to keep our connection chaining so we use myfun.run().then().catch()
 //this then portion runs whenever run is success and catch potion runs when failure

//the first parameter is the url string that helps connecting with the database ,and the next is object
//that has options for tuning mongoose

//in all the files if your remember we specified a port to listen for the database to run as soon as our 
//application starts running

//MIDDLEWARES

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//ROUTES

app.use("/api",authenticationRoutes ); //here /api is fixed and we can have anything here like /bharath /reddy....

app.use("/api",userHandlingRoutes);

app.use("/api",collectionRoutes);

app.use("/api",productRoutes);

app.use("/api",orderRoutes);















//PORT
const port =process.env.PORT||8000; //this process.env port come from dotenv which is a dependency  than we need to create a .env file which has all the environment varibales and we can use it

//STARTING A SERVER

app.listen( port, ()=>{
    console.log(`app is listening at ${port}`);
});

//next we have to do npm start in our terminal and why we need to do is 
//if we see our package.json file there is main-app.js and start is nodemon app.js within scripts 
//whenever we use npm start it creates a nodemon for more see in word document







