//here we are going to get access of the photo from the backend 
//load it here
//the image helper will have a products as props and
//the code in line 10


import React from "react"
import API from "../../backend";
import { getFilterdProducts } from "./coreapicalls";
import "../../styles.css"


const ImageHelper=({product},{match},)=>{
 
 const imageurl=  product ?`${API}product/photo/${product._id}` : 
 "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          

  return(
  
    <div>
      <div className="card-body" >
          
          <img
            src={imageurl}
            alt="photo"
            style={{ Height: "100%", maxWidth: "100%" }}
            
          />
        </div>
    </div>
  )
}

export default ImageHelper;