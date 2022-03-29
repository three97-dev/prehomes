import React from "react";
import Slider from "react-slick";
import SliderArrow from "../basic/slider-arrow/SliderArrow";
import PropertyType from "../property-type/PropertyType";
import "./PropertyTypeSection.css";

const PropertyTypeSection = () => {
  const settings = {
    prevArrow: <SliderArrow classNames="hidden md:block mr-32px" />,
    nextArrow: <SliderArrow rotate={true} classNames="hidden md:block" />,
    slidesToShow: 7,
    slidesToScroll: 1,
    infinite: false,
    touchMove: false,
    responsive: [
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 1,
          arrows: false,
          touchMove: true,
          swipeToSlide: true,
          variableWidth: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 7,
        },
      },
    ],
  };
  return (
    <div className="bg-mild-black px-25px py-16px md:p-16px property-type-section">
      <Slider className="display-flex w-full relative flex items-center" {...settings}>
        <PropertyType />
        <PropertyType />
        <PropertyType />
        <PropertyType />
        <PropertyType />
        <PropertyType />
        <PropertyType />
        <PropertyType />
        <PropertyType />
        <PropertyType />
      </Slider>
    </div>
  );
};

export default PropertyTypeSection;
