//whenever we say  signin({email,password}) this the signin method in index.js is called 
//where we are sending sometghing similar to user object it is going to fetcch the
//url of sigin in the backend and the post man stuff goes here
//and the method headers are set and body will be used to pass  the user to the url
//and from here on backend kicks in and method login in authentication.js takes over
//here email is found if not error if there is eamil it checks for authentication by
//passing the password to authenticate method in user model which checks for the 
//password===encrypassword  if email and password not matched error if matched a token is created
//using jwt.sign and next the token is put in the browser with the help of cookie
//and the user is send to us from the backend that is the data in the then(data=>) in the line 43
//if the data sent has any errors than error
//if no errors than we need to authenticate the token sent to us from the backend 68
//we than call authenticate(data)  that is we are passing the 68 line in authentication.js
//to the authenticate in index.js where it sets the  token that is we usally pass as bearer 
//from the postman next as soon as it reaches the authenticate(data,()=>) the data is the data
//that is sent to us from the backend and than the data goes to the index.js authenticate 
//where it sets the jwt in the localstorage

import React,{useState} from "react";
import Menu from "../core/menu"
import Base from "../core/Base"
import Footer from "../core/footer"
import {Link,Redirect} from "react-router-dom"
import {signin,isAuthenticated, authenticate} from "../auth/helper/index"


const Signin=()=>{

  const [values,setValues]=useState({
    email:"",
    password:"",
    error:"",
    didRedirect:false,
    loading:false,

  });

  const{email,password,error,didRedirect,loading}=values;

  const{user}=isAuthenticated();   //here isAuthenticated method is used simply because it gets acces to entire localstorage of the browser i.e is jwt and this is set by the authenticate method in the index.js


  const handleChange =  name=>event=>{
    setValues({...values,error:false,[name]:event.target.value})
  };

  const onSubmit=event=>{
    event.preventDefault();
    setValues({...values,error:false,loading:true})   //here something is happening so loading is true
    signin({email,password})
    .then(data=>{
      if(data?.error){
        setValues({...values,error:data.error,loading:true})
      }
      else{
        authenticate(data,()=>{   //instead of next we need to set the values
          setValues({
            ...values,
            didRedirect:true
          })
        })
      }
    })
    .catch(console.log("sigin failed"));
  };


   const performRedirect=()=>{
    //TODO:
    if(didRedirect){
      if(user&&user.role===1){
        return <Redirect to="/admin/dashboard"/>
      }
      else{
        return <Redirect to="/"/>
      }
    }
    if(isAuthenticated()){  //this is only true if it returns parseed data to the browser
return <Redirect to="/" />;

    }
  }

  /*const loadingMessage=()=>{
    return( 
      loading && (
        <div className="alert alert-info">
          <h2>loading...</h2>
        </div>
      )
   );
   }
    */
  
 

   const errorMessage=()=>{
    return(
 <div>
       <div style={{"width":"6cm"}}>
       <div className="row" style={{"color":"red"}}>
         <div className="col-12" style={{"padding-left":"px"}}>
       <h6 className="col-12" style={{display:error ? "" :"none"}} />
       {error} 
       </div>
     
      </div>
   </div>
   </div>
  
   );
 }


    const signInForm=()=>{
       
            return(
              <div className="signin" style={{"width":"300px"}}>
                <form style={{"padding":"10px"}} >
                <h3  className="text-center"style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}> Sign in</h3>

                <div className="form-group">
                    <label style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Email address</label>
                    <input type="email" className="form-control"value={email} onChange={handleChange("email")} placeholder="xyz@gmail.com" />
                </div>

                <div className="form-group">
                    <label style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Password</label>
                    <input type="password" onChange={handleChange("password")} value={password} className="form-control" placeholder="Password" />
                </div>

                

                <button type="submit" onClick={onSubmit} className="btn btn-primary btn-block"style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Submit</button>
               <div style={{"padding-bottom":"1cm"}}></div>
            </form>
              </div>
         
            )
        
    }
    return(
      <div style={{"background-color":"rgba(245, 245, 245, 0.972)"}}>
      <Menu/>
      <div className="create" style={{"padding-top":"3cm"}}>
      <div className="container w-25 rounded" > 

      <div className="container h-50 d-inline-block " style={{"background-color":"white"}}> 


   <div className="col-6 offset-sm-12 ">
     {performRedirect()}
        {errorMessage()}
         {signInForm()}
         </div>
        </div>
        </div >
<div style={{"padding-top":"2cm"}}></div>

</div>
  </div>


 

    );
}

export default Signin;