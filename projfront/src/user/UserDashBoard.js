//userDashboard is  a private Route because a user can open his Dashboard only if he signs in
//so this is a private Route and 


import React from "react"
import Menu from "../core/menu"
import Base from "../core/Base"
import Footer from "../core/footer"
const userDashboard = ()=>{
    return(
        <div>
            <Menu />
            <Base  title="User Dashboard page" description=""/>
            <h1>this is A user profile page</h1>
            <Footer />
        </div>

    )
}

export default userDashboard;