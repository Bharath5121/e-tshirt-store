//in here we do authentiation helper which is going to connect our frontend and the backend
//that it helps the authentication process to go on
//we are going to create a method for signup for the backend signup to talk with it and it is 
//going to get user from the backend





import {API} from "../../backend";

export const signup = user=>{
    return fetch(`${API}signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json();  //the line 67 in authentiaction.js backend
    })
    .catch(err=>console.log(err))
}



export const signin = user=>{
    return fetch(`${API}login`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}

//authenticate method is used for making the browser remember and it is going to be loggedin 
//into the account continouusly once signdin
//here the authenticate method simply access the window object and if it is anything other tha
//undefined than we are going to access the loaclstorage and get the jwt token
//here a jwt token is set if the user is succesfully loggedin

export const authenticate =(data,next)=>{
    if(typeof window !==undefined){
        localStorage.setItem("jwt",JSON.stringify(data))  //this is the data that is passed from authentication.js and this is set as jwt with token,user and can be seen in application
        next();
    }
}

export const signout =next=>{
    if(typeof window !==undefined){
        localStorage.removeItem("jwt")
        next();
        return fetch(`${API}signout`,{   //here we dont require any fetch because it in the above line it is already clearing the token so there is no need of redirecting to the backend if you have any doubt remove the code and try once
            method:"GET"
        })
        .then(response=>console.log("signout succesfull"))
        .catch(err=>console.log(err))
    }
    
}

//isauthenticated is used to know if the user is signin or not and if the actual user signedin
//or not and it is done by checking the req.auth object from the backend with req.profile from 
//the frontend
//isauthentcated returns only either the true or false and if there is nothing in the window
//object false and if there is a jwt in the localstorage we are going to pars that else return
//false



export const isAuthenticated =()=>{
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
}


export const faq =()=>
{
    return fetch(`${API}faq`,{   //here we dont require any fetch because it in the above line it is already clearing the token so there is no need of redirecting to the backend if you have any doubt remove the code and try once
        method:"GET"
    })
    
}
 