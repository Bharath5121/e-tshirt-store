//remember this one thing we are not able to use on component in another because of only one reason
//and that is we should always start the component with capital letter
//refernce is from react bootsrtap website 
//now we need to create a method for the menu component so that it changes the color for the 
//active path that is the path which we are at present and other paths are going to have 
//a differnt color than the active path
//the method is currentTab
//here history is an object that is and it has pathname and if it equals the path .....
//we pass the path from the method itself
//here in the line 45 we are having onClick which gives a callback and we are calling 
//signout method that is present in the index.js which fetches the route that is present
//in the backend and in the backend it cleares the cookie but there is no need of backend see the 
//explianation over there
//and then here we need to read the documentaio of react training.com and in in redirect(auth)
//


import React  from "react"
import {Link,withRouter} from "react-router-dom"
import {Navbar,Nav} from "react-bootstrap";
import "../styles.css";
import {signout,isAuthenticated} from "../auth/helper/index"
import { getAllProducts } from "./helper/coreapicalls";
import Search from "./searchbar";

const currentTab=(history,path)=>{
    if(history.location.pathname===path)
    {
        return {color:"pink"}
    }
    else{
        return {color:"palevioletred"}
    }
}

const Menu=({history,
  
    })=>{

        
   
         
          


  
    return(
        <div className="menu">
            <div className="container-fluid">
           <Navbar style={{"font-size":"21px"}}>
               
               <Nav className="mr-auto">
                  <Link  style={currentTab(history,"/")}  className="nav-link" to ="/"><b>Home</b></Link>
                  
                  <Link   style={currentTab(history,"/cart")}className="nav-link" to ="/cart"><b>Cart</b></Link>
                  {isAuthenticated() && isAuthenticated().user.role===0 &&(
                      <Link   style={currentTab(history,"/user/dashboard")}className="nav-link" to ="/user/dashboard"><b>Dashboard</b></Link>
                 
                  )}
                  {isAuthenticated() && isAuthenticated().user.role===1 && (
                      <Link   style={currentTab(history,"/admin/dashboard")}className="nav-link" to ="/admin/dashboard"><b>Admin Dashboard</b></Link>
                 
                  )
                  }

<Link   style={currentTab(history,"/product/Men")}className="nav-link" to ="/product/Men"><b>Men</b></Link>

<Link   style={currentTab(history,"/product/Women")}className="nav-link" to ="/product/Women"><b>Women</b></Link>
                 
<Link   style={currentTab(history,"/product/Kid")}className="nav-link" to ="/product/Kid"><b>Kids</b></Link>
                 
                 

               </Nav>
               
               <Nav className="ml-auto">
                   {!isAuthenticated()&&(
                <React.Fragment>
                           <li className="nav-item">
                           <Link  style={currentTab(history,"/signup")}className="nav-link" to="/signup"><b>Signup</b></Link>
                           </li>
                            <li className="nav-item">
                             <Link  style={currentTab(history,"/signin")} className="nav-link" to="/signin"><b>Signin</b></Link>
                             </li>
                </React.Fragment>
                   )}
                   
                 {isAuthenticated() && ( <Link  style={currentTab(history,"/signout")} className="nav-link"
                         onClick={()=>{
                             signout(()=>{
                                 history.push("/")
                             })
                         }}    
                            ><b>Signout</b></Link>
                 )}
                  
                  
                   </Nav>
           </Navbar>
            
        </div>
        </div>
    )
}


export default withRouter(Menu);
//what this wthrouter does is its going take all the links from the above menu bar and going to check it with routes.js
