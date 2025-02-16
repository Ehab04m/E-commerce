
import axios from "axios"
import styles from "./ProductDetails.module.css"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import Slider from "react-slick"
import { Helmet } from "react-helmet"
import { CartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"
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
  const {addToCart} = useContext(CartContext)
  const { productId } = useParams()
  console.log(productId);
  const [details, setDetails] = useState({})

  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((response) => {
        setDetails(response.data.data)
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
    getProductDetails()


  }, [])

  return (
    
    <div className="row my-20 items-center">
       <Helmet>
        <title>{details.title}</title>
      </Helmet>
     
      <div className="w-1/4 ">
      <Slider {...settings}>
        {details.images?.map((image,index) => (
          <div key={index}>
            <img src={image} alt="" className="w-full" />
          </div>
        ))}
        
      
       
      </Slider>
      </div>
      <div className="w-3/4 ">
        <div className="inner p-4">
          <h2 className="text-2xl font-bold">{details.title}</h2>
          <p className="text-gray-700 text-md my-4">{details.description}</p>
          <small>{details.category?.name}</small>
          <div className="flex justify-between items-center mt-4">
            <p>{details.price} EGB</p>
            <p className="flex justify-center items-center ">
              {" "}
              <FaStar className="text-yellow-300 mx-1" />
              {details.ratingsAverage}</p>

          </div>
          <button onClick={() =>{
            addProduct(details.id)
          }} className="btn w-full"> + Add to cart</button>
          </div>
        </div>
      

    </div>
  )
}
