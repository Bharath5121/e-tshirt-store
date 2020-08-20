//line 50 error is comming directly from the database and is stored in our values and we are showing it



import React,{useState} from "react";
import Menu from "../core/menu"
import Base from "../core/Base"
import Footer from "../core/footer"
import { signup } from "../auth/helper";
import {Link} from "react-router-dom"

const Signup=()=>{
  const [values,setValues]=useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
  });
   
  const{name,email,password,error,success}=values

  const handleChange =  name=>event=>{
    setValues({...values,error:false,[name]:event.target.value})
  };

  const onSubmit =event=>{
    event.preventDefault()
    setValues({...values,error:false})
    signup({name,email,password})//this is the user object we are passing it to the signup in index.js
    .then(data=>{
      if(data?.error){
        setValues({...values,error:data.error,success:false})
      }
      else{
        setValues({...values,name:"",email:"",password:"",error:"",success:true})
      }
    }) 
    .catch(console.log("error in signup")); 
  }

  const successMessage=()=>{
    return( 
      <div style={{"width":"10cm"}}>
      <div className="row" style={{"padding-left":"1px"}}>
      <div className="col-12 " style={{"padding-top":"cm"}}>
    <div className="text-success" style={{display:success ? "":"none"}}>
         please <Link to="/signin">login here</Link>
    </div>
    </div>
    </div>
    </div>
   );
   }
   
  /*const successMessage=()=>{
    return( 
      <div className="row" style={{"color":"red"}}>
      <div className="col-20" style={{"padding-left":"160px"}}>
   
  <h6 style={{display:success ?"" :"none"}} >   Account is successfully created please login <Link to="/signin">login here</Link></h6>
  
   </div>
   </div>
   );
   }*/


   const errorMessage=()=>{
    return(
 <div>
     <div style={{"width":"6cm"}}>
       <div className="row" style={{"color":"red"}}>
         <div className="col-12" style={{"padding-left":"px"}}>
       
       <h6 className="col-12" style={{display:error ? "" :"none"}} />
       </div>
       {error} 
    
      </div>
   </div>
   </div>
  
   );
 }
 const loginForm=()=>{
   return(
     <div>
       <h6>Have an account</h6>
     </div>
   )
 }

    const signUpForm=()=>{
        return(
       
          <div className="signin" style={{"width":"300px"}}>
          <form>
            
<div style ={{"padding-top":"1cm"}}></div>
   {successMessage()}
          <h3  className="text-center"style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}> Sign Up</h3>
          <div className="form-group">
              <label style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Name</label>
            <input type="text" className="form-control"value={name} onChange={handleChange("name")} placeholder="Bharath"  />
          
          </div>
          <div className="form-group">
              <label style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Email address</label>
              <input type="email" className="form-control"value={email} onChange={handleChange("email")} placeholder="xyz@gmail.com" />
          </div>

          <div className="form-group">
              <label style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Password</label>
              <input type="password" onChange={handleChange("password")} value={password} className="form-control" placeholder="Password" />
          </div>
          <button type="submit" onClick={onSubmit} className="btn btn-primary btn-block">Sign up</button>
               <div style={{"padding-bottom":"20px"}}></div>
               <h6 className="text-center"style={{"font-size":"12px"}}>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</h6>
               <div style={{"padding-bottom":"1cm"}}></div>
               </form>

               
                 </div>
             
            
           
          
     
        )
    }


    return(
      <div style={{"background-color":"rgba(245, 245, 245, 0.972)"}}>
      <Menu/>
      <div className="create" style={{"padding-top":"1cm"}}>
      <div className="container w-25 rounded" > 

      <div className="container h-50 d-inline-block " style={{"background-color":"white"}}> 

      <div className="row">
   <div className="col-6 offset-sm-12 ">
        {errorMessage()}
         {signUpForm()}
         </div>
         </div> 
        </div>
        </div >
<div style={{"padding-top":"2cm"}}></div>

</div>
  </div>


    );
};

export default Signup;