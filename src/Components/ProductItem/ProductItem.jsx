
import { FaStar } from "react-icons/fa"
import styles from "./ProductItem.module.css"
import { Link } from "react-router-dom"

export default function ProductItem({product,addProduct}) {
  return (
    <div className="inner p-2 border border-transparent rounded-md">
      <Link to={`/ProductDetails/${product.id}`}>
      
              <img src={product.imageCover} alt="" className="w-full" />
              <small className="text-green-600">{product.category?.name}</small>
              <h5 className="font-semibold my-3">{product.title.split(" ").slice(1, 3).join(" ")}</h5>
              <div className="flex justify-between items-center">
                <p>{product.price} EGB</p>
                <p className="flex items-center">
                  {" "}
                   <FaStar className="text-yellow-300"/>  
                   {product.ratingsAverage}</p>

              </div>
              </Link>
              <button onClick={() =>{
                addProduct(product.id)
              }} className="btn w-full"> Add to cart</button>

            </div>
  )
}
