//how this is worked 
//whenever there is something like /:userId we need to pass it as the below  
//and we need to pass the token through bearer for the authorization to take place
//here we are passing category to the route ${API}category/create/${userId} and  body:JSON.stringify(category)  
//if everything goes as per planned a response is generetaed in collection.js
//and then (response=>) return response.json to the 


import {API} from "../../backend"


export const CreateCategory =(userId,token,category)=>{
    return fetch(`${API}category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
        "Content-Type":"application/json",
        Authorization :`Bearer ${token}`
        },
  
    body:JSON.stringify(category)  //this is passed to req.body in collection.js

 })
 .then(response=>{
     return response.json()
 })
 .catch(err=>console.log(err));

};

//get all categories
export const getAllCategories =()=>{
    return fetch(`${API}categories`,{
        method:"GET"
    }).then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}


//get a single category

export const getCategory=(categoryId)=>{
    return fetch(`${API}category/${categoryId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
}

//update a product
export const updateCategory =(userId,token,categoryId,category)=>{
    return fetch(`${API}category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
      
        Authorization :`Bearer ${token}`
        },
  body:category
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
} 


//delete a category
export const deleteCategory=(categoryId,userId,token)=>{
    return fetch(`${API}category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },

    })
}







 //product calls
export const createProduct =(userId,token,product)=>{ //here product is the form data
    return fetch(`${API}product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
      
        Authorization :`Bearer ${token}`
        },
  body:product
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
} 

//get all products

export const getAllProducts =()=>{
    return fetch(`${API}products`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


//get a product
export const getProduct=(productId)=>{
    return fetch(`${API}product/${productId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err));
}


//update a product

export const updateProduct =(productId,userId,token,product)=>{
    return fetch(`${API}update/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
           Authorization :`Bearer ${token}`
        },
  body:product
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
} 

//delete a product

export const deleteProduct=(productId,userId,token)=>{
    return fetch(`${API}delete/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },

    })
}