//noneed to wory about the functionality and we are just defining how the structure should be  and nothing more



const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;//one way of linking the schema 

//but we can also create multiple schemas in a single doument but not a good idea
//here product cart schema refers to a single product

const productCartSchema = new mongoose.Schema({

    product:{
        type:ObjectId,
        ref:"product",
    },

    name:{      //name of the product we can get it later  from the product that is above in the backend
        type:String, 
        required:true
    },

    count: Number,//we are not using {}, like this because count cannot have more properties other than number

    price:{
        type:Number,
        required:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    }
}


);

const Cart =mongoose.model("product",productCartSchema);//after product cart schema

 //order schema hs feilds that are actually present in the cart like products you are ordering,transactionid,total amount,adress,
 //delivery date,user who is placing it
//here order schema refer to the differnt products we placed 
 const orderSchema = new mongoose.Schema({

     products:[productCartSchema],  //products contain the products that we have ordered 
     
    
     transactionId:{},  //order model is similar to all other documents where we have a collection of oreders placed by users here


     toatalAmount:{
         type: Number,
         required:true
     },
     

     address:{
         type:String,
         maxlength:20000,
         required:true,
     },
     status:{
         type:String,
         default:"Recieved",
         enum:["Cancelled","Delivered","Shipped","Processing","Recieved"]
     },
     user:{
         type:ObjectId,
         ref:"user"//in ""
         
     }


 },
 
 {timestamps:true}

 )
       
 //if we need to throw two schemas than here is the process
//after orderSchema
 const Order=mongoose.model("Order",orderSchema)

 module.exports={Order, Cart};
 

    //if we can see in flipkart we can see a number of products can go into the cart and each product is different so we will have an array of products

