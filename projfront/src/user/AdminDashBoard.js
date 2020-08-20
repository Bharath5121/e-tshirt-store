import React from "react"
import Menu from "../core/menu"
import Base from "../core/Base"
import Footer from "../core/footer"
import {isAuthenticated} from "../auth/helper/index"
import {Link} from "react-router-dom"
import "../styles.css"
const adminDashboard = ()=>{
const {
    user:{name,email,role}
      }=isAuthenticated();  //here why are we using user:{name,email,role} because isAuthenticated() method gives you user and not email,role

      const adminLeft=()=>{
          return(
            
              <div className="card">
                  
                  <h4 className="card-header bg-dark text-white text-center" style={{"font-size":"23px"}} ><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Admin Navigation</b></h4>
               <ul className="list-group">
                   <li className="list-group-item">
                       <Link to="/admin/create/category" className="nav-link text-success text-center" style={{"font-size":"23px"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}> Create Categories</b></Link>
                   </li>
                   <li className="list-group-item">
                       <Link to="/admin/manage/category" className="nav-link text-success text-center" style={{"font-size":"23px"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}> Manage Categories</b></Link>
                   </li>
                   <li className="list-group-item">
                       <Link to="/admin/create/product" className="nav-link text-success text-center" style={{"font-size":"23px"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Create Products </b></Link>
                   </li>
                   <li className="list-group-item">
                       <Link to="/admin/manage/products" className="nav-link text-success text-center" style={{"font-size":"23px"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}> Manage Products</b></Link>
                   </li>
                   <li className="list-group-item">
                       <Link to="/admin/orders" className="nav-link text-success text-center" style={{"font-size":"23px"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}> Manage Orders</b></Link>
                   </li>
               </ul>
                
              </div>
            
          )
      }

      const adminRight=()=>{
          return(
              <div>
                  <div className="card mb-4">
                      <h4 className="card-header bg-light text-black text-left"style={{"font-size":"30px"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}> Admin Information </b></h4>
  
                      <ul className="list-group">
                          <li className="list-group-item">
                              <span className="badge badge-success">Name:</span><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>   {name} Reddy</b>
                          </li>
                          <li className="list-group-item">
                              <span className="badge badge-success">Email:</span>< b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}> {email} </b>
                          </li>
                          <li className="list-group-item">
                              <span className="badge badge-danger">Admin Area</span>
                              </li>

                      </ul>
                      </div>
              </div>
          )
      }
    return(
        <div>
            <Menu />
            <div className="create" style={{"padding-top":"2cm"}}>
            <div className="container p-5" style={{"background-color":"rgb(65, 139, 95)"}}> 
                    <h4 className="col-12 text-white text-center" style={{"padding-bottom":"1cm"}}><b style={{"font-family":"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>ADMIN'S <span style={{"padding-left":"0.2cm"}}>EMPIRE</span></b></h4>
                   
                 <div className="row">
                    <div className="col-4"> {adminLeft()} </div>
                    <div className="col-7">{adminRight()}</div>
                 </div>  
                 </div>
                 </div>
                 </div>
                
         
    )
}

export default adminDashboard;