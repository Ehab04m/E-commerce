
import { Link } from "react-router-dom"
import styles from "./Categories.module.css"
import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../Components/Loader/Loader"

export default function Categories() {
  const [categories, setCategories] = useState([])
  async function getCategories() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        

        setCategories(response.data.data)
      })
      .catch((error) => {
      
      })


  }
  useEffect(() => {

    getCategories()
  }, [])

  return (
    <div className="container mx-auto px-4 my-8">
    {/* Page Heading */}
    <div className="my-6">
      <h1 className="font-medium text-3xl text-gray-800">Categories</h1>
      <nav className="text-sm text-gray-600 mt-2">
        <Link to={"home"} className="hover:underline">Home</Link> &gt; <span>Categories</span>
      </nav>
    </div>
  
    {/* Categories Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id} className="bg-purple-800 border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 text-center h-full flex flex-col justify-between">
              {/* Category Image */}
              <div className="w-1/2 mx-auto h-32 flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
  
              {/* Category Name */}
              <h5 className="text-white font-semibold mt-4">{category.name}</h5>
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  </div>
  )
}
