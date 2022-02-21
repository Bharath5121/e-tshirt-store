//all the authentication methods are inside the authentication controlers
//if you want multiple methods to be exported we use module.exports
//if you want just asingle method to be thrown out we can just say exports.signout
const User =require("../models/user");//we need to bring the user model into the controllers to work on the authentication as it contains the schema and here User name is  same as what we throw from the module.export
const { check,validationResult } = require('express-validator');//this line is used here also for using validation Result
const jwt =require("jsonwebtoken"); //for craeting tokens
const expressJwt=require("express-jwt");//for checking if the user is logged in or not is sjjDBCNDBCHJDVCNX VHDVC xBVCXGC DBC

//EKFKLEWNFNDWMFNRJKNGJRNGNRJGRJTBGJTGEVBD CBC BWD
//NABDHBSDNSVSHVHVDs
exports.signup=(req,res)=>{
    //we need to handle the errors thrown by the route here 
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ error: error.array()[0].msg })}

    const user= new User(req.body);  //we are going to create a user and  this user going to come from class of User
  user.save((error,user)=>{  //here user is somethng that comes from User calss and it is a  mongoose model so we can have  access to all the database methods like save ,populate and user.save throws either an error or the user itself err means we have done something wrong ,user means perfect
      
      if(error){
         return  res.status(400).json({ //here .son is also used because for lear unerstand of the error
              err:"NOT ABLE TO SAVE USER IN DATA BASE"
          });
      }

      res.json({
          name:user.name,
          email:user.email,
          id : user._id
      });
  });
};



exports.login=(req,res)=>{
    const {email,password} =req.body;   //we need to extract email and password from the req.body and this is known as destructuring our data if this body is a large object and contains many feilds we just want email and password

    const error = validationResult(req);
   if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array()[0].msg })}

    
User.findOne({email},(error,user)=>{  //every mongoose model throws  err and the user ,we are saying User(capital U )because it is what we required from the above 3 line user.findone({email},(err,user)=> because it throws errors and the user)
   //if email does not exist it gives error
    if(error||!user){  //if err or there is no user with the gmail than send the res
       return res.status(400).json({
            error:"email does not exist"
        }
        );

    }
  //if email exists it gives user and we need to check it with the password
    if (!user.authenticate(password)) //here authenticate is the method that we wrote in user model and password is what we are sending to the authentcate method and we are getting this password from the req.body from the const {email,password}
    {
          return res.status(401).json({
             error:"email and password do not match"
    });
    }
//next if the email and password match signin

const token =jwt.sign({_id:user._id},process.env.SECRET)  //we are creating atoken based on _id from the user database and it can be either the name or email and process.env.seret is the secret,here user is an object that contains all the feild that we passed and we can access just by using. like user._id

//we need to put the token in the cookie
res.cookie("token",token,{expire:new Date()+999}) //the first token is acual syntax and the next is what we are passing


//send response to the front end that is react.s
const{_id,name,email,role} =user;//here user is the user that is send to us by the user.findone simpy destructuring iy
return res.json({token, user:{_id,name,email,role}}); //here token is sent beacuse front end application can set the token into local storage and user 


});

};




exports.signout =(req,res)=>{
    res.clearCookie("token");  //for signing out we just need to clear the cookie
    res.json({
        message:"logged out"
    });
};




//how isloggedin works the token we 
//protected routes
//how thse work is whenever you logged in we get a particualr token, we are sending the token back to the server using Bearer now if the token is correct we get the route that is protected  otherwise not we dot require this for login,signout,signup
//loggedIn is taken care by expressjwt but for isAdmin,isAuthenticated .... what we shou;d do .... custom middleware is the answer
exports.isLoggedin =expressJwt({  //isLoggedin is amiddleware express.jwt is used for validating and authenticating the token that we created using jwt
    secret:process.env.SECRET,
    userProperty:"auth", //what userproperty really does is it gives the  _id that actually stored in the database which can be used further for tesing

});

//custom middlewares

exports.isAuthenticated =(req,res,next)=>{

let checker =req.profile && req.auth && req.profile._id==req.auth._id; //when user makes arequest to the route, through the frontend we are gonna make a property called profile and this profile is going to be checked only if the user provide certain credentials, and req.auth should be cheked to know if the user loggedIn or not ,and  we need to check if he is the user or not by getting the _id from the frontend is equal to the auth_id
if(!checker){  // if either of the above thing goes false that if the user is not proiding proper credentials or if the profile._id is not same as auth._id than gone.....
      return res.status(403).json({
        error:"access denied "
    });
}
 next();

};


exports.isAdmin =(req,res,next)=>{

if(req.profile.role===0)
{
    return res.status(403).json({
        error:"Cannot Access"
    });
}
  next();  
};