
import axios from "axios"
import styles from "./LatestProducts.module.css"
import { useContext, useEffect, useState } from "react"

import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function LatestProducts() {
  const {addToCart} = useContext(CartContext)
  const [products, setProducts] = useState([])
  async function getProduct() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        setProducts(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }
  async function addProduct(id){
    let response = await addToCart(id)
    console.log(response);
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
  useEffect(() => {
    getProduct()

  }, [])






  return (
    <div className="row justify-center">
      {products.length > 0 ?
        products.map((product) => {
          return <div className="product w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2" key={product._id}>
            <ProductItem product={product} addProduct = {addProduct} />

          </div>

        }):<Loader />
      
      }
        
    </div>
  )
}
