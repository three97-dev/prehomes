import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import classNames from "classnames";
import PropTypes from "prop-types";

import SliderArrow from "../../basic/slider-arrow/SliderArrow";
import SmallTile from "../../small-tile/SmallTile";

import helpMarkImage from "../../../assets/help-mark/help-mark.svg";

import "./SliderSmallTiles.css";

const SliderSmallTiles = ({
  arrowsColor,
  mainTitle,
  showHelpMark,
  smallTileData,
  bgWrapperClasses,
  paddingTitleClasses,
  paddingSliderClasses,
}) => {
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);

  const settings = {
    prevArrow: (
      <SliderArrow
        classNames="small-tile-prev-arrow py-8px px-8px"
        color={arrowsColor === "dark-orange" ? "#AC9986" : arrowsColor === "black-gray-2" ? "#212121" : ""}
      />
    ),
    nextArrow: (
      <SliderArrow
        rotate={true}
        classNames="small-tile-next-arrow py-8px px-8px"
        color={arrowsColor === "dark-orange" ? "#AC9986" : arrowsColor === "black-gray-2" ? "#212121" : ""}
      />
    ),
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
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
          centerMode: true,
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
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 5,
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
        return <div key={index} className="w-251px h-379px mx-auto"></div>;
      });
    }
  };

  if (!smallTileData || smallTileData.length === 0) {
    return null;
  }

  return (
    <div className={classNames(bgWrapperClasses)}>
      <div className="md:mx-60px">
        <div className={classNames("px-62px", paddingTitleClasses)}>
          <div className="text-29px leading-29px text-tundora font-bold tracking-wide font-metropolis">
            <div className="flex">
              {mainTitle}
              {showHelpMark && <img src={helpMarkImage} className="ml-80px hidden md:block" alt="help mark image" />}
            </div>
          </div>
        </div>
        <div className={paddingSliderClasses}>
          <div className="flex md:px-20px">
            <div className="w-full">
              <Slider ref={s => setSlider(s)} {...settings} className="relative">
                {smallTileData.map((item, index) => {
                  return (
                    <SmallTile
                      key={index}
                      id={item.contentful_id}
                      image={item.projectPreviewImage}
                      link={item.fields.pageUrl}
                      title={item.projectName}
                      location={item.projectCity.cityName}
                      price={item.projectMinPrice}
                      className="mb-25px mx-auto"
                    />
                  );
                })}
                {emptyTiles(smallTileData, tileCount)}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SliderSmallTiles.propTypes = {
  showHelpMark: PropTypes.bool,
};

SliderSmallTiles.defaultProps = {
  showHelpMark: false,
};

export default SliderSmallTiles;
