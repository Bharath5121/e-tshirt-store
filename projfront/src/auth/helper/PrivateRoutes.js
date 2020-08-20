//what happens here is that one can use certain routes only if he or she signedin and cannot use
//if not signed in example is userDashboard and 
//now we are going to do redirection based on isAuthenticated 
//here we are having a component called Private Route and any route you want to others
//to see if only logged in goes here and since here we are having only one route 
//so it is passed component:Component ...rest i dontknow yet
//next we need to render this route because it is not yet rendered like routes.js 
//rendered in index.js
//if authenticated load the component or else ask to signin first 
//the code is refernced from reactraining.com from 




import React, { Component } from "react"
import {Route,Redirect } from "react-router-dom"
import {isAuthenticated} from "./index"


const PrivateRoute=({component:Component,...rest})=>{
    return(
        <Route 
        {...rest}
       render={props=> 
        isAuthenticated() ? (
        <Component {...props}/>  //here props is being loaded simply because we need to have  {<PrivateRoute  path="/user/dashboard" exact component={userDashboard} />}  this in privateRoute in routes.js

        
        ) : (
            <Redirect
             to={{
                pathname:"/signin",
                state :{from :props.location}   //this is used to because we are redirecting from user/dashboard to signin

            }}
           />
        )
    }
        />
    );
};

export default PrivateRoute;