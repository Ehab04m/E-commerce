import React, { useContext, useEffect, useState } from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'
import { WishlistContext } from '../../Context/WhishlistContext/WishlistContext'
import { FaStar } from 'react-icons/fa'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import Loader from '../../Components/Loader/Loader'

export default function Wishlist() {

  const [favItems, setFavItems] = useState(null)
  const [updatedItems, setUpdatedItems] = useState([])
  const {addToCart,setNumOfCartItems,setCartId} = useContext(CartContext)
  const { getWishlistData,removeWishlistItem,numOfWishlistItems,setNumOfWishlistItems } = useContext(WishlistContext)
  async function getWishlist() {
    let response = await getWishlistData()
    
    setNumOfWishlistItems(response.count)
    setFavItems(response.data)

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
  async function deleteWishlistItem(id) {
    let response = await removeWishlistItem(id)
   
   
     // Extract the IDs from response.data
  const responseIds = response.data.map(item => item);
 
  

  // Filter the updatedItems to get only those with the IDs in responseIds
  let filteredItems = updatedItems.filter(item => responseIds.includes(item._id));

  // Now you can use filteredItems as needed
 
  setFavItems(filteredItems)
  setNumOfWishlistItems(filteredItems.length);
    





  }
  async function getProduct() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        setUpdatedItems(response.data.data)
      
        
      })
      .catch((error) => {
       
      })

  }
  useEffect(() => {
    getWishlist()
    getProduct()


  }, [])

  return (
    <>
    {favItems ? (
      <div className="flex justify-center p-4">
        <div className="container p-4">
          <div className="flex flex-col justify-center items-center text-center">
            {/* Wishlist Icon and Heading */}
            <IoIosHeartEmpty className="text-4xl text-red-400" />
            <h2 className="font-medium text-red-400 text-4xl py-2">My Wishlist</h2>
            <p className="text-gray-600">There are {numOfWishlistItems} items in your wishlist</p>
  
            {/* Wishlist Table */}
            <div className="relative overflow-hidden mb-20 shadow-md sm:rounded-lg mt-5 w-full">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500">
                  {/* Table Header */}
                  <thead className="hidden sm:table-header-group text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Product</th>
                      <th scope="col" className="px-6 py-3">Added on</th>
                      <th scope="col" className="px-6 py-3">Price</th>
                      <th scope="col" className="px-6 py-3"></th>
                      <th scope="col" className="px-6 py-3">Remove</th>
                    </tr>
                  </thead>
  
                  {/* Table Body */}
                  <tbody className="block sm:table-row-group">
                    {favItems?.length > 0 ? (
                      favItems.map((product) => (
                        <tr
                          key={product._id}
                          className="block sm:table-row bg-white border-b border-gray-200 hover:bg-gray-50"
                        >
                          {/* Product Details */}
                          <td className="block sm:table-cell p-4">
                            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                              <img
                                src={product.imageCover}
                                className="w-16 h-16 object-cover rounded"
                                alt={product.title}
                                loading="lazy"
                              />
                              <div>
                                <h6 className="font-semibold text-gray-800">{product.title}</h6>
                                <p className="text-gray-600">
                                  <span className="font-semibold">Category:</span> {product.category?.name}
                                </p>
                                <p className="flex items-center text-gray-600">
                                  <span className="font-semibold">Rating:</span>
                                  <FaStar className="text-yellow-400 mx-1" /> {product.ratingsAverage}
                                </p>
                              </div>
                            </div>
                          </td>
  
                          {/* Added On */}
                          <td className="block text-nowrap sm:table-cell px-6 py-4 text-gray-700">
                            {product.updatedAt?.split('T')[0]}
                          </td>
  
                          {/* Price */}
                          <td className="block sm:table-cell px-6 py-4 text-nowrap text-gray-700">
                            {product.price} EGP
                          </td>
  
                          {/* Add to Cart Button */}
                          <td className="block sm:table-cell px-6 py-4">
                            <button
                              onClick={() => addProduct(product._id)}
                              className="text-nowrap bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors duration-200"
                            >
                              ADD TO CART
                            </button>
                          </td>
  
                          {/* Remove Button */}
                          <td className="block sm:table-cell px-6 py-4 text-center text-sm">
                            <button
                              onClick={() => deleteWishlistItem(product._id)}
                              className="font-bold text-2xl text-red-500 hover:text-red-600 transition-colors duration-200"
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-600">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : 
<Loader />
    }
  </>

    
    
   
  )
}
