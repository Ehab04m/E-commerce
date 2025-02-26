
import axios from "axios"
import styles from "./ProductDetails.module.css"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import Slider from "react-slick"
import { Helmet } from "react-helmet"
import { CartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"
import Loader from "../../Components/Loader/Loader"
import { WishlistContext } from "../../Context/WhishlistContext/WishlistContext"
import { TbHeartPlus } from "react-icons/tb"
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows:false,
  autoplay:true,
  autoplaySpeed:1000
};

export default function ProductDetails() {

  const [clicked, setClicked] = useState(false)
 
  const {addToCart,setNumOfCartItems,setCartId} = useContext(CartContext)
  const [relatedProducts, setRelatedProducts] = useState([])
  const {addToWishlist,setNumOfWishlistItems} = useContext(WishlistContext)

  const { productId,category } = useParams()

  async function addWishlistProduct(id){
    let response = await addToWishlist(id)
   
    if(response.status === "success"){
      setNumOfWishlistItems(response.data.length)
      setClicked(!clicked)

    }
    
    
   
    
  }


 

  const [details, setDetails] = useState({})

  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((response) => {
       
        setDetails(response.data.data)
      })
      .catch((error) => {
       
      })
  }
  async function getRelatedProducts() {
     await axios
    .get("https://ecommerce.routemisr.com/api/v1/products")
    .then((response) =>{
      let relatedProducts = response.data.data.filter((product) => product.category.name == category)
    
      setRelatedProducts(relatedProducts)
      
      
    })
    .catch((err) =>{
    
      
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
 
  
  useEffect(() => {
    getProductDetails()
    getRelatedProducts()


  }, [productId])

  return (
    <>
      <Helmet>
        <title>{details.title}</title>
      </Helmet>

      {/* Product Details Section */}
      <div className="container mx-auto px-4 my-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images Slider */}
          <div className="w-full lg:w-1/3">
            <Slider {...settings}>
              {details.images?.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{details.title}</h2>
                <button
                  onClick={() => {
                    addWishlistProduct(details.id)}
                  }
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <TbHeartPlus className={`me-4 font-bold   text-red-400 text-2xl  hover:text-red-500 ${clicked ? "heart-icon-clicked" : ""} `} />
                </button>
              </div>

              <p className="text-gray-700 text-md my-4">{details.description}</p>
              <small className="text-teal-500 font-medium">{details.category?.name}</small>

              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-700 font-medium">{details.price} EGB</p>
                <p className="flex items-center text-gray-700">
                  <FaStar className="text-yellow-400 mr-1" />
                  {details.ratingsAverage}
                </p>
              </div>

              <button
                onClick={() => addProduct(details.id)}
                className="btn"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <div key={product._id} className="bg-white border relative border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <Link to={`/ProductDetails/${product.id}/${product.category?.name}`}>
                    <div className="overflow-hidden ">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-48 object-cover border-b-2 transform hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <small className="text-teal-500 font-medium " >{product.category?.name}</small>
                    <div className="flex ">
                    <h5 className="font-semibold text-lg text-gray-800 my-2   text-nowrap">
                        {product.title.split(" ").slice(1, 3).join(" ")}
                      </h5>
                   
                    </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700 font-medium">{product.price} EGB</p>
                        <p className="flex items-center text-gray-700">
                          <FaStar className="text-yellow-400 mr-1" />
                          {product.ratingsAverage}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className=" py-2 px-3">
                    <button
                      onClick={() => addProduct(product.id)}
                      className="btn "
                    >
                      Add to Cart
                    </button>
                    
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
  }
