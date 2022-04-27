import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import SliderArrow from "../basic/slider-arrow/SliderArrow";
import PropertyType from "../property-type/PropertyType";
import "./PropertyTypeSection.css";

const PropertyTypeSection = ({ projectTypes }) => {
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);
  const settings = {
    prevArrow: <SliderArrow classNames="prev project-prev" />,
    nextArrow: <SliderArrow rotate={true} classNames="next project-next" />,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    touchMove: false,
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
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
          <div key={index} className="property-type-item">
            <div className="w-full h-full mx-auto"></div>
          </div>
        );
      });
    }
  };
  return (
    <div className="bg-mild-black md:rounded-b-100px px-25px py-32px md:px-0px property-type-section">
      <Slider
        ref={s => setSlider(s)}
        className="w-full relative property-type-section-slider prehomes-container"
        {...settings}
      >
        {projectTypes.map(projectType => (
          <PropertyType projectType={projectType} />
        ))}
        {emptyTiles(projectTypes, tileCount)}
      </Slider>
    </div>
  );
};

PropertyTypeSection.propTypes = {
  projectTypes: PropTypes.array,
};

PropertyTypeSection.defaultProps = {
  projectTypes: [],
};

export default PropertyTypeSection;
