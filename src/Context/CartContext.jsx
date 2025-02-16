import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext()

export default function CartContextProvider({children}){
    const headers = {
        token:localStorage.getItem("token")
    }
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





    return (
    <CartContext.Provider value={{addToCart,getCartData,removeCartItem,updataProductQuantity,clearCart}} >
        {children}
    </CartContext.Provider>
    )
}