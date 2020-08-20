// category is something that says  winter collection summer collection disney collection
//if some backend operator wants to add products based on the category and this will be the feild where it can be done
//actually what we are doing is we are storing the category field in the database with name 
//what here it really does is if we are creating categories like winter sale,summer sale,special edition,cllasics and so on all these 
//goes into a collection the mongodb


const mongoose=require('mongoose');

const categorySchema = new mongoose.Schema(
    {

      name: {

            type:String,
            trim:true,
             required :true,  //we need required to be true because if some backend technicaloperator wants to create a category than this wiil be the only feild
             unique:true
        },

    },

    {timestamps:true} //records the time and stores the time whenever a new entry is made through this schema and see  }, 
    
    );

    module.exports=mongoose.model("Category",categorySchema);

