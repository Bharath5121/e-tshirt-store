

import React from "react"
import "../styles.css"


const Base=({
    title="Myntra",
    description="Where quality products meets the quality Website",
   className="",
    children
}

)=>{
    
    return(
       <div>
           <div className="container-fluid1">
               <div className="jumbotron bg-dark text-white text-center">
                   <h2>{title}</h2>
                <p>{description}</p>
               </div>
           </div>
 </div>
      
    )
}

export default Base;