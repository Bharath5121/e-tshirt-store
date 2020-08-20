 

import React from "react";
import {Link,Redirect} from  "react-router-dom"
import "../styles.css"
import{FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import{
    faYoutube,
    faInstagram,
    faFacebook,
    faTwitter,
    faGooglePlus
   
} from "@fortawesome/free-brands-svg-icons"
import { faq, isAuthenticated } from "../auth/helper";

const Footer=(history)=>{
    return(
        <div>
        <div className="container-fluid padding">
        <div className="row padding" style={{"background-color": "papayawhip"}}>
        <div className="col-3" style={{"padding-left":"150px"}}>
        <ul>
           <div className="Online">
                    <li><Link to="/signin" style={{"color":"#282c3f"}} >ONLINE SHOPPING</Link></li>
                    </div>
                    <div className="links">
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Men</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Women</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Kids</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Essentials</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Grocerry</Link></li>
                    
                    </div>
           </ul>
           </div>
          
        <div className="col-3">
              <ul>
                 <div className="Online1">
              <li><Link to="/signin" style={{"color":"#282c3f"}} >USEFUL Links</Link></li>
              </div>
          <div className="links1">
                    <li> < Link to="/faq"className="link" style={{"color":"#282c3f"}}>Contact us </Link></li>
                    <li>  <Link  to="/faq" className="link" style={{"color":"#282c3f"}}>FAQ</Link></li>
                    <li>  <Link  to="/faq" style={{"color":"#282c3f"}}>Terms of Use</Link></li>
                    <li>  <Link  to="/faq" style={{"color":"#282c3f"}}>Tracking Order</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Cancellation</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Shipping</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Returns</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Whitehat</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Blog</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Career</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Privacy Policy</Link></li>
                    <li>  <Link  to="/signin" style={{"color":"#282c3f"}}>Site Map</Link></li>
                    
                    
              </div>
              </ul>
           </div>
        

           <div  className="col-6">
<h4 className="contact ">Connect Us With</h4>

            
            <div className="row-social">
            <a style={{"padding-left":"70px"}} href="https://instagram.com" className="youtube">
                <FontAwesomeIcon icon={faYoutube}/>
             </a>
             <a style={{"padding-left":"100px"}} href="https://instagram.com" className="facebook">
                <FontAwesomeIcon icon={faFacebook}/>
             </a>
             <a style={{"padding-left":"100px"}} href="https://instagram.com" className="twitter">
                <FontAwesomeIcon icon={faTwitter}/>
             </a>
             <a style={{"padding-left":"100px"}} href="https://instagram.com" className="instagram">
                <FontAwesomeIcon icon={faInstagram}/>
             </a>
            

            </div>
            </div>
       </div>

        </div>
                   </div>
                   )
                   }

export default Footer;