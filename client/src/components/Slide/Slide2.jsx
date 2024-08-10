import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slide2.css'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

export const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return(
      <div onClick={onClick} className={`arrow ${className}`} >
        <AiOutlineArrowLeft className="arrows" style={{color:"white"}}/>
      </div>
    )
    }

export const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return(
      <div onClick={onClick} className={`arrow ${className}`} >
        <AiOutlineArrowRight className="arrows" style={{color:"white"}}/>
      </div>
    )
  }

const Slide2 = ({ children, slidesToShow, arrowsScroll }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: slidesToShow,
    slidesToScroll: arrowsScroll,
    initialSlide: 0,
    className:"slides",
    nextArrow: <SampleNextArrow to="next"/>,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
    <div className="flex justify-center px-0">
      <div className="w-[87.5%] relative">
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide2;
