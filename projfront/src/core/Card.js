//if we want the data to come from the backen we need to do little bit more process
//the first thing is  we should create a card such that it is dyanmic and going to load 
//the images from the backend 
//for this we are going to creta a component that just gets the image and we are going to use
//the image in the TestCard
//here we are passing product because test card should expect the product and should be reusable



import React,{useState,useEffect} from "react"
import ImageHelper from "./helper/Imagehelper"
import {Link, Redirect} from "react-router-dom"
import API from "../backend";
import { AddItemToCart,RemoveItemFromCart } from "./helper/CartHelper";



const TestCard = ({
    product,
    addtoCart,removeFromCart =false,
    setReload =f=>f,  //it is an anonymous function whatever you give it throws it back like function(f)return{f}
    reload=false 
}) => {

  const [redirect,setRedirect]=useState(false)
  const [count,setCount]=useState(product.count)
  
   const cardCategory=product ?product.category:"wfbwjf"
    const cardTitle=product ?product.name : "Bharath Reddy"
    const cardDescription=product ?product.description : "he is a great man"
    const cardPrice=product ?product.price : "100 crores"

    const getRedirect=(redirect)=>{
      if(redirect){
        return <Redirect to="/cart"></Redirect>
      }
    }

    const AddToCart=()=>{
      AddItemToCart(product,()=>setRedirect(true))
    }

const showAddToCart =(addtoCart)=>(
 addtoCart &&(
    <button  style={{"background-color":"papayawhip"}}    onClick={AddToCart}
    className=" btn-block my-3 " >
   <h6 className="text">Add to Cart</h6>
  </button>
 )
 
)

const showRemoveFromCart =(removeFromCart)=>{
    return(
        removeFromCart &&(
            <button       
            onClick={()=>{
              RemoveItemFromCart(product._id)
              setReload(!reload)
            }}
            className=" btn-block my-2 btn-danger" >
        Remove from Cart
          </button>
         )
         
    )
}


  

    return (
        <div className="mx-3" style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>
      <div className="card text-dark bg-light mx-2">
    <div className="card-header lead">{product.name}</div>
    {getRedirect(redirect)}
        <Link to={`products/${product.category}`}>
        <ImageHelper product={product} 
                    />
                    </Link>
      
         <div className="text-center"> <h6 style={{"color":"purple"}} >{cardDescription}</h6></div>
          <div className="text-center"><h6 style={{"color":"purple"}}>Price :{cardPrice}</h6></div>
         
          <div className="row">
            <div className="col-12 mb-2">
              {showAddToCart(addtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
     
    );
  };
  export default TestCard;