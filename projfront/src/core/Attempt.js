import React,{useState,useEffect} from "react";
import Menu from "../core/menu"
import { getFilterdProducts,getAllProducts } from "./helper/coreapicalls";
import TestCard from "./Card";
import Footer from "./footer";


 
const Attemt=({match})=>{
    
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

      let categoryId=match.params.categoryId
       
 
    
    return(
        <div>
            <Menu/>
            <div className="row text-center">
        <div className="row">
        {products &&products.filter(product => product.category===categoryId).map(filteredProduct => (
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

export default Attemt;