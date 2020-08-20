//here this code is for admin to add categories from the frontend
//mt-5 means margin top 5 and my-2 learn 

import React,{useState, useEffect} from "react";
import Menu from "../core/menu"
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper";
import {Link} from "react-router-dom"
import { updateCategory,getAllCategories} from "./helper/adminapicall";


const UpdateACategory=({match})=>{
  const[name,setName]=useState("") //here it is similar to the one we have done in sigin or signup but instaed of "" here we are having "initial values"
  const[error,setError]=useState("")
  const[success,setSuccess]=useState("")
  
  const{user,token}= isAuthenticated();
     
  const handleChange =event=>{
    setError(false);
    setName(event.target.value)
  }



  
         
  
  
      
  const errorMessage =()=>{
    if(error)
    {
      return <h6  style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}><p style={{"color":"red"}}>Failed to create category**</p></h6>;
    }
    else{
      return "";
    }
  };
  const preload=()=>{
    getAllCategories()
    .then(data=>{
        if(data?.error){
           
           console.log(data.error)   //here we can have a lot to add like success and stuff but becaomes heavy

        }
        else{
            setName(data);  //here we are just setting the products with data in line number 12
       
        }
    })
}

useEffect(()=>{
  preload();
},[])
  const changeCategory=categoryId=>{
      updateCategory(user._id,token,categoryId,{name}).then(data=>{
          if(data?.error){
              setError(data.error)
          }
          else{
              preload()
          }
      })
  }

 const successMessage =()=>{
   if(success)
   {
    return <h6  style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}><p style={{"color":" rgb(223, 64, 64)"}}>{name} updated sucessfully**</p></h6>;
  }
   else{
     return "";
   }
 };
 
       const goback=()=>{
           return(
               <div className="mt-5">    
             <Link className="btn btn-sm btn-success mb-1" to="/admin/dashboard">
               Home
             </Link>
               </div>
           )
       }
    const AddCategoryForm =()=>(
          
        <form>
            <div className="form-group">
            <label className="text-white"><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Enter the Category</b></label>
           
            <input type="text" className="form-control my-3" 
             autoFocus
             required 
             placeholder="summer"
             onChange={handleChange}
             value={name} />
         <button className="btn btn-success btn-block" onClick={()=>{
             changeCategory(match.params.categoryId)
         }} ><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Create Category</b></button>
          
          </div>
        </form>

    )


    return(
        <div>
     <Menu/>
     <div className="create" style={{"padding-top":"3cm"}}>
     <div className="container p-1" style={{"background-color":"rgb(65, 139, 95)"}}> 
     <div className="col-1">{goback()}</div>
     
     <h4 className="col-12 text-white text-center" style={{"padding-bottom":"0.5cm"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Create <span style={{"padding-left":"0.2cm"}}>A Category</span></b></h4>
    
     <div className="row">
         <div className="col-8 offset-md-2 text-white">
        {successMessage()}
        {errorMessage()}
        
            {AddCategoryForm()}
           
         </div>
     </div>
     </div>
        </div>
        </div>
    )
}

export default UpdateACategory;