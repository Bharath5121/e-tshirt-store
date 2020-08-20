const {Order}=require("../models/order");

exports.getOrderById =(req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price")  //here we need to poluate the different products and their name and price
    .exec((err,order)=>{
        if(err) 
        {
        return res.status(400).json(
            {error:"cannot find order"}
            );
        }
        req.order=order;
        next();

    });
};


exports.createOrder=(req,res)=>{
    req.body.order.user =req.profile;    //here we are assigning the user profile to the user defined in the order schema
    const order =new Order(req.body.order);   //here we are saying req.body.order because we are not the one who pass it manually via postman but gets it when we place order

    order.save((err,order)=>{
        if(err)
        { 
              return res.status(400).json({
                  error:"saving order to database failed"
              });
        }
        res.json(order);
    });
};


//read order controller

exports.getAllOrders =(req,res)=>{
    Order.find()
    .populate("user","_id name email")
    .exec((err,orders)=>{
        if(err)
        {
            return res.status(400).json({
                error:"no orders found in database"
            });
        }
        res.json(orders);
    })
}

//i still dont know how to find an order placed by a single user yet



exports.getOrderStatus =(req,res)=>{   //get back to it later if you have any doubts
    let order =req.order;
    
        res.json(order.schema.path("status").enumValues);  //should see if this work or not if not go to the section 11
};


exports.updateStatus =(req,res)=>{
    let order=req.order;
    order.update(
        {_id:req.order._id},
        {$set:req.body.status},
        (err,order)=>{
            if(err)
            {
            return res.status(400).json({error:"cannot update order status"})
            }
          res.json(order);
        }
    );
    

};

exports.getSingleOrder =(req,res)=>{
    let order=req.order;
    res.json(order);
};