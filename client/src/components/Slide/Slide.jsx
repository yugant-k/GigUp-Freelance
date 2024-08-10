import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slide.css'



const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const settings = {
    slidesToShow: slidesToShow,
    slidesToScroll: arrowsScroll,
    arrows: true,
  };

  return (
    <div className="flex justify-center py- px-0">
      <div className="w-[87.5%] relative">
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
