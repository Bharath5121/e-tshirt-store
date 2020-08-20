import {API} from "../../backend"

export const getAllProducts =()=>{
    return fetch(`${API}products`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const getFilterdProducts =(categoryId)=>{
    return fetch(`${API}product/${categoryId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


