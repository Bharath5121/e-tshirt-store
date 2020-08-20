//This is the Home component where the websites mai page is shown and whenever the url is there 
//like localhost:3000 or loacalhost:3000/ it opens the home page this Home component is passed
//to the Routes.js file and from there whenever the path is / than it executes
//how do we interact with the backend
//it is simply by holding the url of the and we place the url generally in the .env file
//and console.log process.env.REACT_APP_BACKEND
//from here on any component we require we just us <Menu /> and so on



//***** THE PRODUCT IS PASSED TO MENU VIA PROPS <MENU PRODUCT> */

import React,{useState,useEffect} from "react";
import "../styles.css"
import Menu from "../core/menu"
import Base from "../core/Base"
import Footer from "../core/footer"
import API from "../backend"
import Carousel from "../core/Carousel";
import Imagehelper from "./helper/Imagehelper";
import TestCard from "./Card";
import { getAllProducts } from "./helper/coreapicalls";


const Home=()=>{

   const[products,setProducts]=useState ([])
const[error,setError]=useState("")


const loadAllProducts=()=>{
  getAllProducts().then(data=>{
    if(data?.error)
    {
      setError(data?.error)
    }
    else{
      setProducts(data)
    }
  })
}

useEffect (()=>{
  loadAllProducts()
},[])

  return(
      <div>
      <Menu product/>  
     <Carousel/>
      

      <div className="container-fluid-padding my-5">
      <div className="row welcome text-center">
      <div className="col-12">
                   <h4 style={{"font-size":"40px"}}>Shop with ease</h4>
               </div> 
               <hr/>
               <div className="col-12">
                   <p ><i>A website which gives you one hundred percent assurance of 
                    world class quality of branded items.And you can belive us with your heart and
                   soul.You are important to us as the engine in a car</i></p>
               </div>
              
        </div>
      </div>

      <div className="row text-center">
        <div className="row">
          {  
          products.slice(0,8).map((product,index)=>{
           
         return(
           
           <div key={index} className="col-3 my-4">
             <TestCard product={product} addtoCart={false} />
             </div>
           
         )


          })}
        </div>
        
      </div>
  
    
      <div>
          <div className="container-fluid my-3">
            <h4 style={{"text-align": "center"}}>Our Philosophy</h4>
            <div className="row padding" style={{"background-color":"transparent"}}>
              <div className="col-lg-6">
                 
            <p><i>However, to ensure that the underlying philosophy of the company does not get diluted, 
            the company has found a unique technique to instil its 10 core values into the employees. 
            Each pillar in the office highlights and explains a few core values like ownership, respect,
            equality and transparency.</i></p>
            <p><i>Keeping this value system in mind, the office follows an open plan with neither Bansal 
            nor the top managers occupying cabins. However, the employees do have fixed work stations 
            and teams sit together to improve productivity. </i></p>
            <br/>
              </div>
              <div class="col-lg-6">
                
                   <img src="img/quality.jpg" className="image-fluid mx-auto d-block" style={{"padding-top": "150px"}} />
                 
                </div>
            </div>
          </div>
      </div>
      
      <Footer/>
      </div>
  )

}

export default Home;