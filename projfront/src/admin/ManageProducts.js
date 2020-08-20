import React ,{useState, useEffect} from "react"
import Base from "../core/Base"
import Menu from "../core/menu"
import {Link} from "react-router-dom"
import { isAuthenticated } from "../auth/helper"
import { getAllProducts, deleteProduct } from "./helper/adminapicall"



const ManageProducts=()=>{    

    const [products,setProducts] =useState([]) 
    const [error,setError]=useState("")  //here empty array because a lot of products come from the database and we need to store all and initially it is an empty array  of products
    const {user,token}=isAuthenticated()

    const preload=()=>{
        getAllProducts()
        .then(data=>{
            if(data?.error){
               
               console.log(data.error)   //here we can have a lot to add like success and stuff but becaomes heavy

            }
            else{
                setProducts(data);  //here we are just setting the products with data in line number 12
           
            }
        })
    }

    useEffect(()=>{
      preload();
    },[])

const removeProduct =productId=>{
    deleteProduct(productId,user._id,token)
    .then(data=>{
        if(data.error){
            setError(data.error)
            console.log(data.error)
        
        }
        else{
            preload()   //here why preload is used because if the product is deleted than and if we call preload() the preload method executes  getAllProducts and the product is deleted succesfully
                       //and now getAll products executes and once agin find all the products and if there is change in products setProducts(products) executes and products.map goes on returns the products
        }
    })

}




const goback=()=>{
    return(
        <div className="mt-5 mx-3">    
      <Link className="btn btn-sm btn-success mb-1" to="/admin/dashboard">
        Home
      </Link>
        </div>
    )
}
    const errorMessage=()=>{
    return(
 <div>
       <div className="row" style={{"color":"red"}}>
         <div className="col-20" style={{"padding-left":"80px"}}>
       <h6 className="col-12" style={{display:error ? "" :"none"}} />
       {error} 
    
      </div>
   </div>
   </div>
  
   );
 }

    return (
        <div style={{"background-color":"rgb(65, 139, 95)"}}>
        <Menu/>
        {goback()}
        <div className="create" >
            {errorMessage()}
        
        <h4 className="col-12 text-white text-center" style={{"padding-bottom":"1cm"}}> <span style={{"color":"silver"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Manage The Products</b></span></h4>
      
        <div className="row">
        <div className="col-4">
                <h5  className="text-white text-left mx-3 " style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}><b style={{"color":"pink"}}>All Products</b></h5>
          </div>
          
          <div className="col-4">
                 <h5 className="text-white text-center" style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}><b style={{"color":"pink"}}>Update the Products</b></h5>
          </div>

          <div className="col-4">
                  <h5  className="text-white text-right" style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}><span style={{"padding-right":"40px"}}><b style={{"color":"pink"}}> Delete The Products</b></span></h5>
          </div>
           </div>

          {products && products.map((product,index)=>{
           return(
            <div key={index} className="row">
            <div className="col-4">
           <h6 className="text-white my-4 mx-3"><b>{product.name}</b></h6>
            </div>
            
            
            <div className="col-4">
                
                <Link className="btn btn-sm btn-success my-3 offset-md-3"
                      to={`/admin/product/update/${product._id}`} >
                  <span> <b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Update Product</b></span> </Link>
           </div>
           
            <div className="col-4">
               
            <button className="btn btn-sm btn-danger my-3 offset-md-5" onClick={()=>{
                                                   removeProduct(product._id)  //this kind of approach is used  if we and the product to be ececuted than and there
                                            }} >
                    <b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Delete Product</b></button>
           
            </div>
 
        </div>
           )
          })
          }


        </div>
           </div>
          
    )
}

export default ManageProducts;