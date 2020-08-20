//how is it this product working
//NOW WE NEED TO TAKE CARE OF THE FRONTEND AND HOW IS IT TAKEN CARE
//fisrt we need to create a form and set all the input states to null
//next the handlechange method 
//if the hadlechange method has photo event.target.files[0] takes place or else handle the value
//and next we need to set the formDate.set(name,value)
//once the entire form is set we need to go to onSubmit 
//and as soon as we reach createProduct(user._id,token,formData) this part the createProduct in
//adminApicall is called and then the backend route is fetched passing all the data
//whenever it comes to createProduct function in the  so that the createProduct in adminapicalls
//it recahes the fetch and reaches the backend producthandling and reaches the /product/create/userId
//authorization  for the token so that it knows it is the admin
//and now it reaches the create product in the backend and we need to the form to parse
//so that it gives err,feilds,files if there is error in saving the photo it is going to give error
//next destructuring the feilds that are passed to it 
// let product= new Product(feilds);  //i.e is formdata
//now the work with the actual file i.e the photo 
//check the size than the type of the file and we need to read the path of the file with a
//readfilesync and than comes the saving the photo in the database if err
//if success than it sends product saved as response to then in admin api call and
//from there if we recieve any data


//here as soon as we are in the create products page the feilds should be preloaded
//and that can be done hooks and the method present in here is preload and this works similar
//to cmponentDidMount 
//next come all the states 



import React,{useState,useEffect} from "react";
import Menu from "../core/menu"
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper";
import {Link,Redirect} from "react-router-dom"
import { createProduct, getAllCategories} from "./helper/adminapicall";



const AddProduct=()=>{

    const{user,token}=isAuthenticated();


    //initially settng the states

    const [values,setValues]=useState({
        name:"",
        description:"",
        price:"",
        quantity:"",
        photo:"",
        Type:"",
        categories:[],    //all the categories that come from the database when said getAllcategories and can be seen in select
        category:"",     //the category which we selected from all the categories
        loading:false,    //loading is false beacuse e have not done aything yet
        error:"",         //error is empty nethier false nor true 
        createdProduct:"",    //created product is the entire product thatis just bean created
        success:"",
        formData:"",
        didRedirect:"" //the form that we are craeting is not a normal html form but we need to prepare the form into bject of form data so that all the information can be passed to backend
       });

    const{name,description,price,Type,stock,success,quantity,categories,category,loading,error,
             createdProduct,formData,didRedirect}=values;

          //preloading the data
         
          const preload=()=>{         //this method is used because everything should be preloaded and this method should be passed to useEffect method
                 getAllCategories().then(data=>{
                     
                     if(data?.error){
                         setValues({...values,error:data?.error})
                     }
                     else{
                         setValues({...values,categories:data,formData:new FormData()})   //fformData:new FormData() because since we just got all the categories from the database and we need to keep it up and running
                       
                     }
                 })
             }
   
//we need to pass the preload to useEffect method for everything to be preloaded
 //and we need this useEffect to preload the chages we have done in categories  once remove this method and see
            
         useEffect(()=>{
               preload()  
            
            },[]);

            const performRedirect=()=>{
                //TODO:
                if(didRedirect){
                return <Redirect to="/admin/dashboard"/>
                  }
               
              }
           
const handleChange=name=>event=>{
const value = name=== "photo" ? event.target.files[0] : event.target.value    //if the name==="photo" we want to have the file and in all other cases we are just having the value given to us

formData.set(name,value)   //for suppose if we are hadlling price first price is going to assigned to name and than it chesks if it is equal to  photo ;;;ifnot it tkaes the value and sets into the formdata
setValues({...values,[name]:value})
}

const onSubmit =(event)=>{
    event.preventDefault();
    setValues({...values,error:"",loading:true})
    createProduct(user._id,token,formData)
    .then(data=>{
        if(data?.error)
        {
            setValues({...values,error:data?.error,success:false,didRedirect:false})
        }
        else{
            setValues({
                ...values,
                name:"",
                description:"",
                category:"",
                price:"",
                photo:"",
                Type:"",
                stock:"",
                loading:false,
                createdProduct:"",
                success:true,
                didRedirect:true,
                  //here we are havng this just to pop a value
            })
        }
    })
    .catch()

}

    const AddProductForm =()=>
    <form>
        
        <label className="text-white my-1"><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Name</b></label>
        <input type="text" className="form-control "  value={name} onChange={handleChange("name")} autoFocus required  placeholder="Name"  />
        
        <label className="text-white my-1"><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Description</b></label>
        <textarea className="form-control my-0.5 "  value={description} onChange={handleChange("description")} autoFocus required  placeholder="Description" />
        
        <label className="text-white my-1"><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Price</b></label>
        <input type="number" className="form-control my-0.5 " value={price} onChange={handleChange("price")} autoFocus required  placeholder="Price" />
   
        <label className="text-white my-1"><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Select</b></label>
        
        <div className="form-group">
            <select onChange={handleChange("category")}
            className="form-control">
                {categories &&
                 categories.map((cate,index)=>(
                <option key={index} value={cate._id}>{cate.name} </option>
                ))
              }           
            </select>
        </div>
        <label className="text-white my-1"><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Quantity</b></label>
      <input type="number" className="form-control my-0.5" value={quantity} onChange={handleChange("quantity")} autoFocus required  placeholder="Quantity" />
     
      <label className="text-white my-1"><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Type</b></label>
      <input type="text" className="form-control my-0.5" value={Type} onChange={handleChange("Type")} autoFocus required  placeholder="Men" />
     
     
      <div className="form-group">
          <label className="text-white my-2"style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} ><b> Post Photo</b></label>
      <span style={{"padding-left":"100px"}}> <input className="form-control my-0.5 " onChange={handleChange("photo")} type="file" name="photo" accept="image" placeholder="upload file" /></span>
        
        </div>
         <button className="btn btn-success btn-block my-4" type="submit" onClick={onSubmit}  ><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Create Product</b></button>
        
    </form>

const goback=()=>{
    return(
        <div className="mt-5">    
      <Link className="btn btn-sm btn-success mb-1" to="/admin/dashboard">
        Home
      </Link>
        </div>
    )
}

const successMessage =()=>{
    if(success)
    {
     return <h6  style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}><p style={{"color":"pink"}}> product created sucessfully**</p></h6>;
   }
    else{
      return "";
    }
  };

  

  const errorMessage=()=>{
    return(
 <div>
       <div className="row" style={{"color":"red"}}>
         <div className="col-20" style={{"padding-left":"80px"}}>
       <h6 className="col-12" style={{display:error ? "" :"none"}} />
       {error} 
    
      </div>
   </div>
   </div>
  
   );
 }

    return (
        <div>
            <Menu/>
            <div className="create" style={{"padding-top":"3cm"}}>
     <div className="container p-1" style={{"background-color":"rgb(65, 139, 95)"}}> 
    <div className="col-1">{goback()}</div>
     
     <h4 className="col-12 text-white text-center" style={{"padding-bottom":"0.5cm"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Add<span style={{"padding-left":"0.2cm"}}>Product</span></b></h4>
    
     <div className="row">
         <div className="col-8 offset-md-2 text-white">
        {successMessage()}
        {errorMessage()}
        {performRedirect()}
            {AddProductForm()}
           
         </div>
     </div>
     </div>
        </div>
      
        </div>
    )
}

export default AddProduct;