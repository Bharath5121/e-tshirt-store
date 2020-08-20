//Index.js is the main file from which we access all the files that are wrapped inside the root element
//we imported routes.js file because from here on we need to access the routes defined in the routes .ks
//and for that we need ReactDOM FOR rendering the element 
//here we are rendering the Routes.js component and we are rendering it in the root
//but where is this Root it is in index.html

import React from "react"
import Routes from "./Routes"
import ReactDOM from "react-dom"

ReactDOM.render(<Routes />,document.getElementById("root"));

