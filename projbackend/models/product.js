const mongoose =require("mongoose");

const {ObjectId} = mongoose.Schema;  //we need to refer the object id to refer the schema 

const productSchema =new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true, //required is true because when storing in the database it should have a name
        maxlength:32,

    },
    description:{

        type:String,
        trim:true,
        required:true, //required is true because when storing in the database it should have a name
        maxlength:2000

    },

    price:{
        type:Number,
        required:true,
        maxlenth:32,
    },

    //schema actually defines the structure of the document and its a validation thing that actually going on here 
    //here product must have a category field where and it is required when the database administrator is storing the product in the database
    //the category schema is reffered  by ref and i think that an objectid is thrown to the category feild present in the product
    
    category:{  //defining category because every product goes into some sort of category when stored in data

          type:ObjectId,  //from where are we getting this object id
          required:true,
          ref:"category", //name category is taken from module.exports= mongoose.model("category",categorySchema) because we have thrown out entire module with a sinle name category
    },

    quantity:{
        type:Number,
        required:true
    },

    sold:{
        type:Number,
        default:0

    },

    photo:{ //this is how we put images into our database and most othe uploading images into the database might consider a lot of memory
        data:Buffer,//buffer type is used when we usually wok withitems that get saved in binary form
        contentType:String// here we are providing the image url
    },
      
      
    Type:{
        type:String,
        trim:true,
        required:true, //required is true because when storing in the database it should have a name
        maxlength:32
    }

},

{timestamps:true}

);

module.exports=mongoose.model("Product",productSchema); 