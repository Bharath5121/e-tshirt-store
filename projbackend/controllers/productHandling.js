const Product=require("../models/product");

const { check,validationResult } = require('express-validator');
const formidable =require("formidable");  //for handling form type of data like images,pdfs,mp3,videos basically binary data
const _ = require("lodash"); //makes the process of iteration easier
const fs =require("fs");  //used for accesing the path of the file
const { parse } = require("path");
const { sortBy } = require("lodash");
const getCategoryById =require("./collection")

//middleware
exports.getProductById =(req,res,next,id)=>{
     Product.findById(id)
     .populate("Category")    //here it is gonna populate based on the Category CAPITAL C
     .exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({
               error:"Product not found in database"
            });
        }
  req.product=product;
  next();
     });
};

//getProduct controller
exports.getProduct=(req,res)=>{
   //req.product.photo =undefined;  //here we are gonna stop take the bulky thing that is binary data istead we are gonna put a middleware  i.e when we fire a front end request the req.json(product) is gonna work well and this photo can load in the background
    return res.json(req.product);  //if we are reading data like json this works fine but if we are working with data like binary they are not simply hanndled on get route

};



//middleware for performance optimization or if you are not understanding any of it better take req.product.data =undefined and remove this middleware
exports.photo =(req,res,next)=>{   //this is a middleware that sends photo only if it has data in it otherwise not
    if(req.product.photo.data)  //this is called safety net check where whenever only there is data we are gonna work
    {
        res.set("Content-Type",req.product.photo.contentType); //here Content-Type is jpeg
        return res.send(req.product.photo.data);
    }
    next();
};

//getAllproduct controller (i.e) product listing

exports.getAllProducts=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit):20  //i.e ot takes the value passed by the user or default 8 products will be shown or you may not require this at all you can simply use 8 in the limit(8)
    let sortBy=req.query.sortBy ? (req.query.sortBy):"_id"  //or you can have populars ....
    Product.find()
    .select("-photo") //this is similar to req.product.photo=undefined and -(-ve) is to say that we dont require it
    .populate("Category")
    .sort([[sortBy,"asc"]])     //you can have anything based on the date that product is craeted or populars
    .limit(limit)    //like how many you want and if you want user to select this than 
    .exec((err,products)=>{
        if(err)
        {
            return res.status(400).json({
            error:"cannot find any products"
            });
        }
         
        res.json(products);
    });
};

//creating a method for posting products into our database

//quick overview of what happening down here
//first declare a form 
//here it gives you error,feilds,file 
//error implies something with image gone wrong
//feilds are something we pass while giving the image into our data base like  name,descryption,price,category..and so on


//createproductController
exports.createProduct=(req,res)=>{
    let form =new formidable.IncomingForm();  //here form is an object  
    form.keepExtensions=true;//to know which type of extension it is using

   form.parse(req,(err,feilds,file)=>{  // its how we parse the req in the form https://flaviocopes.com/express-forms-files/ you can see this for more

      if(err)
      {
          return res.status(400).json({
              error:"problem with image (i.e) too big or kinda somethimg"
          })
      }
      //destructuring the feilds//
      const{name,description,category,price,quantity,Type}=feilds;
      if(!name||!description||!category||!price||!quantity||!Type)
      {
          res.status(400).json({
              error:"all feilds are mandatory"
          })
      }

      let product= new Product(feilds); // we are getting all the feilds like category,price,name,descryption...

    
      //handling file 
      if(file.photo){
        if(file.photo.size>4000000)
        {
         return res.status(400).json({
             error:"file size is to big"
         });

        }
        product.photo.data =fs.readFileSync(file.photo.path);   //we need to include the file in our product and file.product.data here data is where we provide the path of the url  and we need to check it with the path i.e is given to the formidable
         product.photo.contentType=file.photo.type; 
    }

    //save to the DB
    product.save((err,product)=>
    {
        if(err)
        {
      return res.status(400).json(
          {
              error:"saving tshirt to database failed"
          });
        }
      res.json(product);   //the entire product is saved as database and sent to us
    });
   });

};

//delete controller
exports.deleteProduct =(req,res)=>{
    let product=req.product;
    product.remove((err,deletedProduct)=>{
      if(err)
     {
    return res.status(400).json({
        error :"failed to delete the product"
         });
     }
     res.json({
         message:`${deletedProduct} is deleted sucessfully`
     });
    });

};


//update controller
//how this is done
//as soon as the updation page is loaded we are goonna take the info from the data base

exports.updateProduct =(req,res)=>{
    let product =req.product;
let form =new formidable.IncomingForm();
form.keepExtensions=true;

     form.parse(req,(err,feilds,file)=>{
         if(err)
         {
             return res.status(400).json({
                 error:"problem with image"
             })
         }
         //let product= new Product(feilds); here we rae not gonna have the new product
         //since we are updating we need to take the existing product that comes up with getProductById
         product = _.extend(product,feilds) ;  //extend method takes the existing values in the object  the feilds above there are gonna get updated in the product

if(file.photo){
        if(file.photo.size>4000000)
        {
         return res.status(400).json({
             error:"file size is to big"
         });

        }
        product.photo.data =fs.readFileSync(file.photo.path);   //we need to include the file in our product and file.product.data here data is where we provide the path of the url  and we need to check it with the path i.e is given to the formidable
         product.photo.contentType=file.photo.type; 
    }

    //save to the DB
    product.save((err,product)=>
    {
        if(err)
        {
      return res.status(400).json(
          {
              error:"updation of product failed"
          });
        }
      res.json(product);
         
     });
    });
};




//my contoller





//now if you want to upadate the sold and reduce the stock whenever we made a purchase
//there has to be a middleware for that and you can write two seperate middlewares fo that
//but we can use model.bulkwrite

//what is bulkwrite.... it helps you to work on multiple methods on a single collection at a time

exports.updateStock =(req,res,next)=>{
  let myOperations =req.body.order.products.map(product=>{  //here it takes products from the order and loops throgh it so we can update the inventory
    return{
        updateOne:{
            filter:{_id:product._id},  //this is for finding the product_id and we use filter for it
            upadate:{$inc:{stock: -product.count, sold: +product.count}}  //here product.count comes from the user and he can order 4 items...and so on

        }
    }


  })

  Product.bulkWrite(myOperations,{},(err,products)=>{
      if(err)
      {
          return res.status(400).json({
              error:"Bulk Operations failed"
          });
      }

      //here we are no returning anything as this is a middleware
  });

    next();
};

//Distict Categories Controller
exports.getAllDistinctCategories =(req,res)=>{
    Product.distinct("Category",{},(err,categories)=>{
        if(err)
        {
            return res.status(400).json({
                error:"no category found"
            })
        }
        res.json(categories)
    });
};

exports.getProductCategories =(req,res)=>{
 Product.filter(categoryId,{},(err,products)=>{
     if(err)
     {
        return res.status(400).json({
            error:"no category found"
        })
     }
     res.json(products)
 })

}
//exports.getProductofCategory =()=>{
    

    