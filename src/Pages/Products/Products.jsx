

import axios from "axios"
import { useContext, useEffect, useState } from "react"


import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WhishlistContext/WishlistContext";
import ProductItem from "../../Components/ProductItem/ProductItem";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";

export default function LatestProducts() {
  const {addToCart,setNumOfCartItems,setCartId} = useContext(CartContext)
  const {addToWishlist,setNumOfWishlistItems} = useContext(WishlistContext)

  
  const [products, setProducts] = useState([])
  async function getProduct() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        setProducts(response.data.data)
       ;
        
      })
      .catch((error) => {
      
      })

  }
  async function addProduct(id){
    let response = await addToCart(id)
    setNumOfCartItems(response.numOfCartItems);
    setCartId(response.cartId)
        
   
    if(response.status === "success"){
      toast.success(response.message,{
        style:{
          fontWeight:"700",
          color:"black"
          
        }
      })
    }else{
      toast.error("Failed To Add Product",{
        style:{
          fontWeight:"700",
          color:"red"
          
        }
      })

    }
    
  }
  async function addWishlistProduct(id){
    let response = await addToWishlist(id)
 ;
    if(response.status === "success"){
      setNumOfWishlistItems(response.data.length)

    }
    
    
   
    
  }

  useEffect(() => {
    getProduct()

  }, [])
  return (
    <div>
      <div className="my-4">
        <h1 className="font-medium text-3xl ">products</h1>
      </div>
      <nav className="text-sm text-gray-600">
              <Link to={"home"} className="hover:underline">Home</Link> &gt; <span>Products</span>
            </nav> 
      <div className="row justify-center">
         {products.length > 0 ?
                products.map((product) => {
                  return <div className="product w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2" key={product._id}>
                    <ProductItem product={product} addProduct = {addProduct} addWishlistProduct = {addWishlistProduct} />
                    
        
                  </div>
        
                }):<Loader />
              
             
              }


      </div>
      
    </div>
  )
}
