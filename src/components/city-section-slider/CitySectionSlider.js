import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import Image from "../basic/image/Image";
import SliderArrow from "../basic/slider-arrow/SliderArrow";

const CitySectionSlider = ({ images, setHero }) => {
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);

  const settings = {
    slidesToShow: 7,
    slidesToScroll: 1,
    afterChange: index => images[index] && setHero(index),
    focusOnSelect: true,
    prevArrow: <SliderArrow classNames="mr-64px" />,
    nextArrow: <SliderArrow classNames="ml-64px" rotate />,
    infinite: false,
    touchMove: true,
    onInit: useCallback(() => {
      if (slider) {
        setTileCount(slider.innerSlider.props.slidesToShow);
      }
    }, [slider, setTileCount]),
    onReInit: useCallback(() => {
      if (slider.innerSlider.props.slidesToShow !== tileCount) {
        setTileCount(slider.innerSlider.props.slidesToShow);
      }
    }, [slider, tileCount, setTileCount]),
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
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 8,
        },
      },
    ],
  };

  const emptyTiles = (arr, amount) => {
    if (arr.length < amount) {
      let extra = [];
      for (let i = arr.length; i < amount; i++) {
        extra.push(i);
      }
      return extra.map(index => {
        return (
          <div key={index} className="flex justify-center w-120px h-80px">
            <div className="w-full h-full mx-auto"></div>
          </div>
        );
      });
    }
  };

  return (
    <Slider
      ref={s => setSlider(s)}
      {...settings}
      className="slider-wrapper display-flex w-full bg-light-purple px-25px md:px-120px py-35px"
    >
      {images.map((img, index) => {
        return (
          <div className="slider-container">
            <Image image={img} key={index} className="w-120px h-80px rounded-10px" />
          </div>
        );
      })}
      {emptyTiles(images, tileCount)}
    </Slider>
  );
};

CitySectionSlider.propTypes = {
  images: PropTypes.array,
  setHero: PropTypes.func,
};

CitySectionSlider.defaultProps = {
  images: [],
};

export default CitySectionSlider;
