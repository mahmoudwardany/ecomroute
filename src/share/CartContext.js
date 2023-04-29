import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext=createContext(null)

export function CartContextProvider(props){
    useEffect(()=>{
        getAllCart()
    },[])
    let Base_Url='https://route-ecommerce-app.vercel.app'
    const [cart,setCart]=useState(null)
async function getAllCart(){
    let headers={
        token:localStorage.getItem('userToken')
    }
let {data}=await axios.get(`${Base_Url}/api/v1/cart`,{headers})
setCart(data)
}
async function removeItem(id){
    let headers={
        token:localStorage.getItem('userToken')
    }
let {data}=await axios.delete(`${Base_Url}/api/v1/cart/${id}`,{headers})
setCart(data)
}
async function upDateItem(id,countNum){
    let headers={
        token:localStorage.getItem('userToken')
    }
    let body={
        count:countNum
    }
let {data}=await axios.put(`${Base_Url}/api/v1/cart/${id}`,body,{headers})

setCart(data)
}
    return <CartContext.Provider value={{getAllCart,cart,removeItem,upDateItem}}>
     {props.children}
    </CartContext.Provider>
}