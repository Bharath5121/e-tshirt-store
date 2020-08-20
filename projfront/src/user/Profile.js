import React from "react"
import Menu from "../core/menu"
import Base from "../core/Base"
import Footer from "../core/footer"
const profile = ()=>{
    return(
        <div>
            <Menu />
            <Base  title="profile page" description=""/>
            <h1>this is A profile page</h1>
            <Footer />
        </div>

    )
}

export default profile;