//what we need to do is that we need to as soon as the card is pressed we need to store the card 
//information in the loacal storage
//here why next is used as soon as the the AddItemToCart to process the item it should pass
//the information to the cart page so we are using this method just as a middleware

//whenever we click  onClick={AddToCart} const AddToCart=()=>{
     // AddItemToCart(product,()=>setRedirect(true))
    //}  prduct is passed i.e is item
    //this method gets called inn the and then  AddItemToCart is called 
    //whats happening here is that if the window object is undefined we want to acces the local
//storage that contains cart and parse the loacl storage push all the items into cart
//and than setItem of localStorage with stringified cart



export const AddItemToCart =(item,next)=>{
    let cart=[]
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){   //if there is local storage that contains cart
      cart=JSON.parse(localStorage.getItem("cart")) //this is just a tempary varible 
        }
        cart.push({
            ...item,
            count:1
        })
       
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
}

export const cartEmpty =next=>{   //if we have succesfully proccessed all the nformation than the cart should be empty
    if(typeof window!==undefined)
    {
        localStorage.removeItem("cart")
        next();
    }
}


export const loadCart =()=>{

    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){   //if there is local storage that contains cart
      return JSON.parse(localStorage.getItem("cart")) //this is just a tempary varible 
        }
    }
}


 export const RemoveItemFromCart =(productId)=>{
    let cart=[];
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){   //if there is local storage that contains cart
      cart=JSON.parse(localStorage.getItem("cart")) //this is just a tempary varible 
        }

        cart.map((product,index)=>{
            if(product._id===productId){
                cart.splice(index,1);
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
    }

}
