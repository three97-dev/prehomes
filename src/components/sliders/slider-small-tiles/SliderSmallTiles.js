import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import classNames from "classnames";
import PropTypes from "prop-types";

import SliderArrow from "../../basic/slider-arrow/SliderArrow";
import SmallTile from "../../small-tile/SmallTile";

import "./SliderSmallTiles.css";
import Button from "../../basic/button/Button";

const SliderSmallTiles = ({
  mainTitle,
  icon,
  showNoProjects,
  smallTileData,
  bgWrapperClasses,
  paddingTitleClasses,
  paddingSliderClasses,
}) => {
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);

  const settings = {
    prevArrow: <SliderArrow classNames="small-tile-prev-arrow py-8px px-8px" />,
    nextArrow: <SliderArrow rotate={true} classNames="small-tile-next-arrow py-8px px-8px" />,
    infinite: false,
    slidesToShow: 5,
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

  if ((!smallTileData || smallTileData.length === 0) && !showNoProjects) {
    return null;
  }

  return (
    <div className={`py-64px px-25px md:px-0px prehomes-container ${classNames(bgWrapperClasses)}`}>
      <div>
        <div className={classNames(paddingTitleClasses)}>
          <div className="flex justify-between">
            <div className="flex items-center flex-1 space-x-16px md:space-x-32px">
              {icon && <img src={icon} alt={`${mainTitle} icon`} />}
              <h2 className="text-black-gray">{mainTitle}</h2>
            </div>
            <div className="flex-1 hidden md:flex justify-end">
              <Button variants="outline_thin" btnClasses="px-30px py-10px">
                <span>View All</span>
              </Button>
            </div>
          </div>
        </div>
        {smallTileData && smallTileData.length > 0 ? (
          <div className={paddingSliderClasses}>
            <div className="flex">
              <div className="w-full">
                <Slider ref={s => setSlider(s)} {...settings} className="small-tiles-slider relative">
                  {smallTileData.map((item, index) => {
                    return (
                      <SmallTile
                        key={index}
                        id={item.strapiId}
                        image={item.projectHeroImage}
                        link={item.fields.pageUrl}
                        title={item.projectName}
                        location={item.city?.cityName}
                        price={item.fields.projectMinPrice}
                        specialIncentive={item.specialIncentive}
                        className="mx-auto"
                      />
                    );
                  })}
                  {emptyTiles(smallTileData, tileCount)}
                </Slider>
              </div>
            </div>
          </div>
        ) : (
          <h3 className="text-black-gray font-poppins font-normal pt-25px md:pt-40px pb-30px px-25px md:px-62px">
            No Projects
          </h3>
        )}
      </div>
    </div>
  );
};

SliderSmallTiles.propTypes = {
  showHelpMark: PropTypes.bool,
  smallTileData: PropTypes.array,
};

SliderSmallTiles.defaultProps = {
  showHelpMark: false,
  smallTileData: [],
};

export default SliderSmallTiles;
