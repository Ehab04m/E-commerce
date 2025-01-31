import Slider from "react-slick";
import img1 from "../../assets/slider-image-1.jpeg"
import img2 from "../../assets/slider-image-2.jpeg"
import img3 from "../../assets/slider-image-3.jpeg"
import styles from "./MainSlider.module.css"
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  speed: 2000,

};
export default function MainSlider() {
  return (
    <div className="row my-9">
      <div className="w-3/4">
      <Slider {...settings}>
        <div>
          <img className="w-full h-[500px]" src={img1} alt="" />
        </div>
        <div>
        <img className="w-full h-[500px]" src={img2} alt="" />
        </div>
        <div>
        <img className="w-full h-[500px]" src={img3} alt="" />
        </div>
      </Slider>
      </div>
      <div className="w-1/4">
      <img className="w-full h-[250px]" src={img2} alt="" />
      <img className="w-full h-[250px]" src={img3} alt="" />
      </div>
      
    </div>
  )
}
