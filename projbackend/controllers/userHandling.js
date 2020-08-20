//here in userhandling we do find by id,getUser,updateUser anything that related to a sinleId or user can be done here



const User =require("../models/user");
const Order=require("../models/order");


//getUserById middleware
exports.getUserById=(req,res,next,id)=>{
User.findById(id).exec((err,user)=>{
    if(err ||!user)
    {
        return res.status(400).json({
            error :"No User Is Found With The Corresponding Id"
        });
    }
    req.profile =user; //now we get the user and we need t store the user in request object . we do it by creating an object inside request called profile inside the reqest
    next();

})
};

//getUser

exports.getUser =(req,res)=>{
req.profile.salt =undefined; //we are keeping it undefined because we dont need all the things to be popualted in the profile
req.profile.encry_password=undefined;
req.profile.createdAt=undefined;
req.profile.updatedAt=undefined;
    res.json(req.profile);   //this just provides the user stored in the request object whenevevr someone wants user

};

//updateUser

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(   //we need to pass some parameters and those are gonna be objects
        {_id:req.profile._id},
        {$set:req.body},   //we are updating something in the body so we need to use $set
        {new:true,useFindAndModify:false}    //compulsury parameters here everything is as per the documentation
        
    ).exec((err,user)=>{
            if(err)
            {
                res.status(400).json({
                    error:"You are not authorized to update"
                });

            }
            user.salt=undefined
            user.encry_password=undefined
            res.json(user);
    
    }
    );
};

//here what happens is we first find the user and the populate is used to  

//userOrders //i did not understand

exports.userOrders=(req,res)=>{   //this is seen by the user and no the admin
      Order.find({user:req.profile._id}) //here we are able to find the user present in the collection of orders
      .populate("user","_id name")  //here  
      .exec((err,order)=>{
       if(err){
           return res.status(400).json({
               error:"Your Haven't Made An Order Yet"
           });
       }
       return res.json(order);

      });
};        //whatever user has ordered goes here

//pushOrder middleware this also not understand
exports.pushOrderInPurchaseList=(req,res,next)=>{  //later we will understand
  let puchases=[];
  req.body.Order.products.forEach(product=>{   //first we should go into body =>into order collection and into products feild i.e is present in order and loop through each product present in it
      purchases.push({
            _id:product._id,
            name: product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id

      });
  });
  //store this in db
  User.findOneAndUpdate(
      {_id:req.profile._id},
      {$push:{purchases:purchases}},
      {new:true},
      (err,purchases)=>{
          if(err)
          {
              return res.status(400).json({
                  error:"uable to save purchase list"
              })
          }
      }
  );

    next();
};