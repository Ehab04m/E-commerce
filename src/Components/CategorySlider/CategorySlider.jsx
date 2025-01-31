
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
      console.log(err)
    })
  }
  useEffect(() => {
    getCategories()
    
  
    
  }, [])
  
  return (
    <div className=" my-8 mx-10">
       <Slider {...settings}>
      {categories.map((category) => (
        <div key={category._id} >
          <img className="w-full h-[300px]" src={category.image} alt={category.name} />
          <h3 className="m-3 font-semibold">{category.name}</h3>
        </div>
      ))}
      
    </Slider>

    </div>
   
  );
}
