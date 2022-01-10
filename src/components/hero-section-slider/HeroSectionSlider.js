import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import SliderArrow from "../basic/slider-arrow/SliderArrow";
import Button from "../basic/button/Button";

import "./HeroSectionSlider.css";
import Image from "../basic/image/Image";

import Favorite from "../../assets/tiles/favorite.svg";
import FavoriteRed from "../../assets/tiles/favorite-red.svg";

const HeroSliderArrow = ({ onClick, classNames, rotate }) => {
  return (
    <div
      onClick={onClick}
      className={`${classNames} z-30 h-65px w-65px bg-white cursor-pointer flex justify-center rounded-full`}
    >
      <SliderArrow color={"black"} rotate={rotate} classNames="my-auto" />
    </div>
  );
};

const HeroSectionSlider = ({
  images,
  topText,
  subtitle,
  title,
  saveButton,
  requestButton,
  onClickSave,
  onClickRequest,
  isCity,
  isFavorite,
}) => {
  const [nav, setNav] = useState(0);
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);
  const { isLoggedIn } = useSelector(state => state.session);

  const HeroTitle = ({ className }) => {
    return (
      <div className={`${className}`}>
        {isCity ? (
          <div className="text-tundora">
            <div className="text-11px md:text-14px leading-11px md:leading-12px font-bold font-metropolis text-dark-creamy">
              {topText}
            </div>
            <div className={`text-29px md:text-47px leading-29px md:leading-54px font-late-november -mt-2px mb-18px `}>
              {title}
            </div>
            <div className="text-14px md:text-16px leading-16px md:leading-18px font-late-november md:max-w-430px mx-auto md:mx-0px">
              {subtitle}
            </div>
          </div>
        ) : (
          <div className="md:w-270px">
            <p className="text-tundora font-late-november text-29px md:text-47px leading-29px md:leading-54px">
              {title}
            </p>
            <div className="flex justify-center md:justify-start">
              {isLoggedIn && (
                <Button
                  variants="black_gradient"
                  onClick={onClickSave}
                  btnClasses="flex justify-center justify-self-center mt-29px text-14px leading-17px font-rosario font-bold w-154px h-54px md:mr-20px"
                >
                  <div className="flex items-center my-auto">
                    <img className="w-22px h-19px mr-10px" src={isFavorite ? FavoriteRed : Favorite} alt="favourite" />
                    <div className="mr-10px">{saveButton}</div>
                  </div>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    touchMove: false,
    className: "center",
    afterChange: index => images[index] && setNav(index),
    focusOnSelect: true,
    prevArrow: <HeroSliderArrow classNames="prev" />,
    nextArrow: <HeroSliderArrow classNames="next" rotate />,
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
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          arrows: false,
          touchMove: true,
          centerMode: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,
          touchMove: true,
          centerMode: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 3,
          arrows: false,
          touchMove: true,
          centerMode: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 1100,
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
          <div key={index} className="flex justify-center h-205px px-5px py-10px">
            <div className="w-full h-full mx-auto"></div>
          </div>
        );
      });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-peach-colour">
      <div className="header-hero-section relative w-screen">
        <div className="grid">
          <div className="header-white-section hidden md:block z-10"></div>
          <HeroTitle className="hero-title hidden md:block left-120px z-20 max-w-350px" />
        </div>
        <div className="hero-image h-full absolute pt-100px md:pt-0px md:right-0px top-0px">
          <Image image={images[nav]} className="md:min-w-700px w-full h-full" />
        </div>
      </div>
      <div className="absolute bg-white bottom-1/4 md:bottom-0px w-full z-20">
        <Slider ref={s => setSlider(s)} {...settings}>
          {images.map((img, index) => {
            return (
              <div key={index} className="flex justify-center h-150px md:h-205px px-5px py-10px cursor-pointer">
                <Image image={img} className="block h-full" />
              </div>
            );
          })}
          {emptyTiles(images, tileCount)}
        </Slider>
      </div>
      <div className="absolute w-full bottom-0px h-1/4">
        <div className="hero-title w-full text-center px-25px">
          <HeroTitle className="block md:hidden" />
        </div>
      </div>
    </div>
  );
};

export default HeroSectionSlider;

HeroSectionSlider.propTypes = {
  images: PropTypes.array,
  topText: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  saveButton: PropTypes.string,
  requestButton: PropTypes.string,
  isCity: PropTypes.bool,
  onClickSave: PropTypes.func,
  onClickRequest: PropTypes.func,
  isFavorite: PropTypes.bool,
};

HeroSectionSlider.defaultProps = {
  images: [],
  topText: "",
  subtitle: "",
  title: "",
  saveButton: "",
  requestButton: "",
  isCity: false,
  onClickSave: () => {},
  onClickRequest: () => {},
  isFavorite: false,
};
