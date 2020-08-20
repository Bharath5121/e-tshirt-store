import React,{useState,useEffect} from "react";
import Menu from "./menu"
import { getFilterdProducts,getAllProducts } from "./helper/coreapicalls";
import TestCard from "./Card";
import Footer from "./footer";


 
const Men=({match})=>{
    
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

      let kind=match.params.Men
       
 const filteredProducts =categoryId=>{
           return products.categoryId;
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

export default Men;