
import axios from "axios"
import styles from "./CategorySlider.module.css"
import { useEffect, useState } from "react"
import Slider from "react-slick";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2,
        initialSlide: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default function CategorySlider() {
  const [categories, setCategories] = useState([])
  async function getCategories() {
    await axios
    .get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res) => {
     setCategories(res.data.data)
    })
    .catch((err) => {
      
    })
  }
  useEffect(() => {
    getCategories()
    
  
    
  }, [])
  
  return (
    
      <div className="container mx-auto px-4 my-20">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
            Categories
          </h1>
          <div className="border-b-4 border-purple-500 w-24 mx-auto mb-2"></div>
          <div className="border-b-2 border-purple-300 w-12 mx-auto"></div>
        </div>
  
        {/* Categories Slider */}
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id} className="px-2">
              <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-2xl font-bold text-center">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
   
  
}
