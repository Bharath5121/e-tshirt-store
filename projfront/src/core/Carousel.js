import React from "react"

import "../styles.css"
import {Link} from "react-router-dom"

const Carousel =()=>{
  const  imageurl = "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/31/69c3ce11-a154-4fd1-96fb-cfcb6ad36ea11596215492495-Plus-men_dk.jpg"
      return(
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
        <div className="carousel-item active">
        <div className="carousel ">
             <Link to="/product/Men"> <img src={imageurl}
              alt="photo" 
              class="d-block w-100" 
              style={{"height":"505px"}} />
              </Link>
            </div>
            </div>
            </div>
            </div>
    )
}

export default Carousel;