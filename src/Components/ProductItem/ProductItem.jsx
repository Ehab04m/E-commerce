
import { FaStar } from "react-icons/fa"
import styles from "./ProductItem.module.css"
import { Link } from "react-router-dom"
import { TbHeartPlus } from "react-icons/tb"
import { useState } from "react"

export default function ProductItem({ product, addProduct, addWishlistProduct }) {
  const [clicked, setClicked] = useState(false)
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/ProductDetails/${product.id}/${product.category?.name}`}>
        {/* Product Image */}
        <div className="overflow-hidden">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-48 md:h-56 object-cover border-b-2 transform hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Product Details */}
        <div className="p-3 ">
          {/* Category */}
          <small className="text-teal-500 font-medium">{product.category?.name}</small>

          {/* Title and Wishlist Button */}
          <div className="flex   justify-between  items-center mt-2">
            <h5 className="font-semibold text-lg md:text-sm  text-nowrap  text-gray-800">
              {product.title.split(" ").slice(1, 3).join(" ")}
            </h5>
            <button    onClick={(e) => {
            e.preventDefault()
            addWishlistProduct(product.id)
            setClicked(!clicked)
          }}>
            <TbHeartPlus className={` font-bold   text-red-400 text-2xl  hover:text-red-500 ${clicked ? "heart-icon-clicked" : ""} `} />
          </button>
          </div>

          {/* Price and Rating */}
          <div className="flex flex-wrap justify-between items-center mt-3">
            <p className="text-gray-700 font-medium">{product.price} EGB</p>
            <p className="flex items-center text-gray-700">
              <FaStar className="text-yellow-400 mr-1" />
              {product.ratingsAverage}
            </p>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
     <div className="py-2 px-3">
     <button
        onClick={() => addProduct(product.id)}
        className="btn"
      >
        Add to Cart
      </button>
     </div>
    </div>
  );
}
