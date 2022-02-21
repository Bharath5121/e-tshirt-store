const Category=require("../models/category");

//middleware is the important factor here

//middleware for getCtegoryByID
exports.getCategoryById=(req,res,next,id)=>{   //here id refers to the id of category 
    Category.findById(id).exec((err,category)=>{
    if(err)
    {
        return res.status(400).json({
           error:"Category not found in database"
        });
    }
req.category=category;   //here category contains the feilds that are present inside the model simmilar to req.profile object
next();
});
};

//create Category

exports.creatingCategory=(req,res)=>{   
        const category =new Category(req.body) ;   //how this create gonna work we need to create a category object that comes from Category model and this is gona come from req.body
      
        category.save((err,category)=>{  //here category is used and not Category
           if(err)
           {
               return res.status(400).json({
               error:"cannot create category"
               });
           }
           res.json({
               category
           });
        });

};

//get category controller
exports.getCategory =(req,res)=>{
    res.json(req.category);  //because when we pass categoryId through url which populates the req.category

};

//getAllCategorey controller
exports.getAllCategory =(req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err)
        {
            return res.status(400).json({
            error:"cannot find any categories"
            });
        }
        return res.json(categories);
    });
};


//updateCategory controller

exports.updateCategory =(req,res)=>{
    Category.findByIdAndUpdate(
        {_id:req.category._id},
        {$set:req.body},
        {new:true,useFindAndModify:false}
    ).exec((err,updatedCategory)=>{
       if(err)
       {
           return res.status(400).json({
               error:"cannot upadate the category"
           });
       }

      return res.json(updatedCategory);
    });
};


//deleteCategory controller

exports.deleteCategory=(req,res)=>{
    const category=req.category; //this comes from getcategorybyId and we need to get the category as it is in req.category
category.remove((err,category)=>{
    if(err)
    {
        return res.status(400).json({
            error:"failed to delete the category"
        });
    }
        res.json({
            message:`Succesfully Deleted the ${category.name}`
        });
});
};