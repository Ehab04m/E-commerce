import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const CartContext = createContext()

export default function CartContextProvider({children}){
    const headers = {
        token:localStorage.getItem("token")
    }
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState(null)
    function addToCart(productId) {
        return axios
        .post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId,
        },{headers})
        .then((response) => response.data)
        .catch((err) => err)
        
        
    }
    function getCartData(){
        return axios
        .get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers
        })
        .then((response) => response.data)
        .catch((err) => err)
    }
    function removeCartItem(id){
        return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers
        })
        .then((response) => response.data)
        .catch((err) => err)
        

    }
    function updataProductQuantity(id,count){
        return axios
        .put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            count: count
        },{
            headers
        })
        .then((response) => response.data)
        .catch((err) => err)
        

    }
    function clearCart(){
        return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then((response) => response.data)
        .catch((err) => err)
        

    }
    function cashOndelivery(data) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        data,
        {
            headers

        }
        )
        .then((response) => response.data)
        .catch((err) => err)
        
    }
    async function cartData() {
        let response = await getCartData()
        setNumOfCartItems(response.numOfCartItems);
        setCartId(response.cartId)
        
        
        
        
    }
    function onlinePayment(data) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,data,{
            headers
        })
        .then((response) => response.data)
        
        .catch((err) => err)
    }
    useEffect(() => {
      cartData()
    
      
    }, [])
    





    return (
    <CartContext.Provider value={{addToCart,
    getCartData,
    removeCartItem,
    updataProductQuantity,
    clearCart,
    numOfCartItems,
    setNumOfCartItems,
    setCartId,
    cashOndelivery,
    onlinePayment,
    }} >
        {children}
    </CartContext.Provider>
    )
}