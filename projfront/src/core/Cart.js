
//how is it loading all the prodcts is the question mark
//first wea re going to deefine states 
//BEORE EVERYTHING USEeFFECT IS CALLED and sets the products to
//the products that are present in the cart //with the help of loadCart method in the cardHELPER
//an it parses all the products and when retured it sets all the products with the information 
//present in the localstorage
//Now when {loadAllProducts()}</div> this is called it maps throw the products that are 
//already present and passes products to the card



//reloading how is it reloading 
//const [reload,setReload]=useState(false)   //here why we are using is whenever we want to reload or remount a component we have to set a state
//first we are setting it to false so that when useEffect it doesnt reload next 
//we need to pass these as varibales to the card
//so when we click the Remove From Cart Button with a specific Id the method in the cart helper is called and it does its duty
//and then sets the reload to (!reload) false to true and changes the stuff
// now  setReload =f=>f this takes the value and passes to   setReload={setReload} and this changes the reload to be true
//now again reload is false because it is used as props reload=false and then same process repeats


import React,{useState,useEffect} from "react";
import "../styles.css"
import Menu from "../core/menu"
import { loadCart } from "./helper//CartHelper";
import TestCard from "./Card";
import { isAuthenticated } from "../auth/helper";


const Cart=()=>{
const[products,setProducts]=useState([])
const [reload,setReload]=useState(false)   //here why we are using is whenever we want to reload or remount a component we have to set a state


  
useEffect(()=>{
    setProducts(loadCart());
},[reload])     //this is used here because if we want to forecefully remount a component i.e in future if thre is any change in the component and if you want to forcefully reload the component



const loadAllProducts=()=>{
    return(
        <div>
            {products.map((product,index)=>{
                return(
                <TestCard 
                key={index}
                product={product}
                addtoCart={false}
                removeFromCart={true}
                setReload={setReload}
                reload={reload}
                />
                )
            })}
        </div>
       
    )
}
   
const loadCheckout=()=>{
    return(
        <h4 className="my-3">CheckOut</h4>
    )
}
   

  return(
      <div style={{"background-color":""}}>
      <Menu/> 
      

      <div className="row my-2">
          <div className="col-3 offset-md-2 " style={{"padding-top":"2cm"}} >
            
              {loadAllProducts()}
              
              </div>
          <div className="col-6 text-center">{loadCheckout()}</div>
      </div>



      </div>
  
    
      
      
      
  )

}

export default Cart;