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
    <div className="container mx-auto px-4 my-8">
      <div className="flex flex-col lg:flex-row gap-4">
        
        <div className="w-full lg:w-3/4">
          <Slider {...settings}>
            <div>
              <img
                className="w-full h-[300px] lg:h-[500px] object-cover rounded-lg"
                src={img1}
                alt="Slide 1"
              />
            </div>
            <div>
              <img
                className="w-full h-[300px] lg:h-[500px] object-cover rounded-lg"
                src={img2}
                alt="Slide 2"
              />
            </div>
            <div>
              <img
                className="w-full h-[300px] lg:h-[500px] object-cover rounded-lg"
                src={img3}
                alt="Slide 3"
              />
            </div>
          </Slider>
        </div>

      
        <div className="w-full lg:w-1/4 hidden lg:flex flex-col gap-4">
          <img
            className="w-full h-[250px] object-cover rounded-lg"
            src={img2}
            alt="Side Image 1"
          />
          <img
            className="w-full h-[250px] object-cover rounded-lg"
            src={img3}
            alt="Side Image 2"
          />
        </div>
      </div>
    </div>
  );
}
