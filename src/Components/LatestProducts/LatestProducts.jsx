
import axios from "axios"
import styles from "./LatestProducts.module.css"
import { useContext, useEffect, useState } from "react"

import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WhishlistContext/WishlistContext";

export default function LatestProducts() {
  const {addToCart,setNumOfCartItems,setCartId} = useContext(CartContext)
  const {addToWishlist,setNumOfWishlistItems} = useContext(WishlistContext)

  
  const [products, setProducts] = useState([])
  async function getProduct() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products/",{
        params:{
         
          limit:15
        }
      })
      .then((response) => {
        setProducts(response.data.data)
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
   
    if(response.status === "success"){
      setNumOfWishlistItems(response.data.length)

    }
    
    
   
    
  }

  useEffect(() => {
    getProduct()

  }, [])






  return (
    <div>
      <div className="my-10">
      <h1 className="text-4xl  text-center font-extrabold text-gray-900 leading-tight tracking-tight mb-2">
    Latest Products
</h1>
<div className="border-b-4 border-purple-500 w-24 mx-auto mb-2"></div>
<div className="border-b-2 border-purple-300 w-12 mx-auto"></div>
      </div>
 

       <div className="row justify-center">
      {products.length > 0 ?
        products.map((product) => {
          return <div className="product  w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2" key={product._id}>
            <ProductItem product={product} addProduct = {addProduct} addWishlistProduct = {addWishlistProduct} />
            

          </div>

        }):<Loader />
      
      }
        
    </div>

    </div>

   
  )
}
