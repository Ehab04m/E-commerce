import axios from "axios";
import { createContext, useState } from "react";

export const WishlistContext = createContext();
export default function WishlistProvider({children}){

    const headers = {
        token:localStorage.getItem("token")
        
        
    }
    const [numOfWishlistItems, setNumOfWishlistItems] = useState(0)
    
    
    
    
     function getWishlistData(){
        
        
        return   axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers,
        }).then((response) => response.data
        ).catch((error) => error)
    }
   async function wishlistData() {
    let response =  await getWishlistData()
    setNumOfWishlistItems(response.count)
  
    
    
   }
   wishlistData()
   

    function addToWishlist(productId) {
        return axios
        .post("https://ecommerce.routemisr.com/api/v1/wishlist",{
            productId,
        },{headers})
        .then((response) => response.data)
        .catch((error) => error)
        
        
    }
    function removeWishlistItem(id){
        return axios
        .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers
        })
        .then((response) => response.data)
        .catch((error) => error)
        

    }




    return(
        <WishlistContext.Provider value={{
            getWishlistData,
            addToWishlist,
            removeWishlistItem,
            numOfWishlistItems,
            setNumOfWishlistItems
        }}>
            {children}
        </WishlistContext.Provider>
    )



    
}
