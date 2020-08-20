//The Front end starts here 
//we need this Routes.js for going to the desired component wrapped in <BrowserRouter> and than
//<Switch>


//what are the private route and why we need to use there are certain routes that should be see
//only if user loggs in and one such is UserDashboard
//now first we need to import the component called privateRoute 

//****here when we are saying <PrivateRoute  path="/user/dashboard" exact component={userDashboard} /> */
//whats happening is the component userdashboard is sent to the privateroute and than checks
//for conditions and when it goes to  <Component {...props}/>  it goes to the userDashboard and executes that stuff


//the same is happenng for admin route but simply it is checking the role 



import React from "react"
import { BrowserRouter, Switch,Route } from "react-router-dom"
import Home from "./core/Home"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import AdminRoute from "./auth/helper/AdminRoutes"
import PrivateRoute from "./auth/helper/PrivateRoutes"
import userDashboard from "./user/UserDashBoard"
import adminDashboard from "./user/AdminDashBoard"
import Faq from "./mycomp/faq"
import AddCategory from "./admin/AddCategory"
import AddProduct from "./admin/AddProduct"
import ManageProducts from "./admin/ManageProducts"
import ManageCategories from "./admin/manageCategories"
import UpdateAProduct from "./admin/updateProduct"
import UpdateACategory from "./admin/UpdateACategory"
import ProductsCard from "./core/CardProducts"
import Attemt from "./core/Attempt"
import Men from "./core/Men"
import Women from "./core/Women"
import Kid from "./core/Kid"
import SearchBar from "./core/searchbar"
import Cart from "./core/Cart"





const Routes=()=>{
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={Signup}/> 
            <Route path="/signin" exact component={Signin}/>
            <Route path="/faq" exact component={Faq}/>
            <PrivateRoute path="/user/dashboard" exact component={userDashboard} />
            
            <AdminRoute path="/admin/dashboard" exact component={adminDashboard} />
            <AdminRoute path="/admin/create/category" exact component={AddCategory} />
            <AdminRoute path="/admin/create/product" exact component={AddProduct} />
            <AdminRoute path="/admin/manage/products" exact component={ManageProducts} />
            <AdminRoute path="/admin/manage/category" exact component={ManageCategories} />
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateAProduct} />
            <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateACategory} />
            <PrivateRoute path="/products/:categoryId" exact component={Attemt} />
            <PrivateRoute path="/product/:Men" exact component={Men} />
            <PrivateRoute path="/product/:Women" exact component={Women} />
            <PrivateRoute path="/product/:Kid" exact component={Kid} />
            <PrivateRoute path="/cart" exact component={Cart} />
            
        
        
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;