import React,{useState,useEffect} from "react";
import Menu from "./menu"
import { getFilterdProducts,getAllProducts } from "./helper/coreapicalls";
import TestCard from "./Card";
import Footer from "./footer";


 
const Kid=({match})=>{
    
    const[products,setProducts]=useState("")
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

      let kind=match.params.Kid
       
 const nofilteredProducts=(filteredProduct)=>{
   if(!filteredProduct){
    return <TestCard product="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
   }
 } 

    
    
    return(
        <div>
            <Menu/>
            <div className="row text-center">
        <div className="row">
        {products &&products.filter(product => product.Type===kind).map(filteredProduct => (
          
              <div  className="col-3 my-3">
              <TestCard product={filteredProduct} addtoCart={true} />
              </div>
                ))}
        </div>
        
      </div>
      <Footer />
        </div>
    )
}

export default Kid;