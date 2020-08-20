//schema is nothing but you are working with your database and with what name it should be stored in the database
//like here we hace user schema where it has name,lastname,email,encrypassword....and so on
//if it is required to be stored than it is true
//here we are woking with mongoose and not mongodb
//it manages realationship with data ,provides schema validation,and is used to translate objects in code and the represention ofthose objects in the database
//mongoose is used for creating schemas
//collections in mongo are equivalent to tables in relational databases
//the schema beow is just used for validation process when the data is actually

const mongoose=require('mongoose');
const crypto=require('crypto');
const { v4: uuidv4 } = require('uuid');


var userSchema =new mongoose.Schema({
    
    name:{
        type:String,
        maxlength:32,
        required:true,
        trim:true
    },

    
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    gender:{
         type:String,

    },
     

    userInfo:{
        type:String,
        trim:true
    },

   encry_password:{
        type:String,
        required:true,
    },
          // what it really does is depending on the role you have certain privelages such as admin,user,techteam,feedbackadmin
          // and we give it type number because if 0 user,if 1 feedback admin,if 2 tech team,if 3 admin the higher the number the higher the privelages
   
   salt:String,
          role :{
        type:Number,
        default:0  // default set to zero because anybody using website is an user
    },

    purchases:{
        type:Array,    //set to array beacuse whenever an user purchases something we push it into purchases so we can keep track of purchases
        default:[0]     //because user can buy anything or not

    }
},

{timestamps:true}

);
//a set function that allows you to manipulate the data before it is saved to the database

userSchema.virtual("password")  //we are creating a virtual field called password because password is just used for refernce and what actually stored in the database is encry_password

   .set(function(password){ // we are passing password because we expect some one to pass the password that is user
          
            //this._password=password //here we are using underscore because _nothing but private so we can use for later use
            this.salt=uuidv4();
            this.encry_password= this.securePassword(password)   //we need to encrypt the password and this can be done by passing the password to secure password function
   })

   .get(function(){
       return _givenpassword  //sometimes we need to use the password that is given by the user
   })


//before we export we need to create some methods
userSchema.methods ={  // creating methods is simple and see documenation
    

    authenticate:function(plainpassword)//what are we really doing here is that if we are logging in with the password that is given the first time while signing up
    {
      return this.securePassword(plainpassword)==this.encry_password   //here it just retuns either true or false it checks with the password that is stored in our database
    },

    securePassword:function(plainpassword)
    {
        if(!plainpassword) return"";  //why we put empty string is that in the encry password it is given required to be true and encry password cannot accept because it required
         try {
             return crypto.createHmac('sha256', this.salt)   //this.salt is something called secret and it generates new uniqueid everytime
             .update('plainpassword')       //because we want to update plain password
             .digest('hex');
             
         } catch (error) {
             return "";   //because empty password cannot be scored given required true
             
         }                        
    }
}

module.exports =mongoose.model("User",userSchema); //here in this line user is reffered somwhere else
