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
import VideoIcon from "../../assets/video.svg";
import ModalVideo from "../modal-video/ModalVideo";

const HeroSectionSlider = ({
  images,
  topText,
  subtitle,
  title,
  saveButton,
  onClickSave,
  isCity,
  isFavorite,
  className,
  videoLink,
}) => {
  const [nav, setNav] = useState(0);
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useSelector(state => state.session);

  const HeroTitle = ({ className }) => {
    return (
      <div className={`${className}`}>
        {isCity ? (
          <div>
            <div className="eyebrow-font text-dark-orange">{topText}</div>
            <h1 className="text-black-gray -mt-2px mb-10px md:mb-20px">{title}</h1>
            <div className="footer-font md:font-light text-black-gray md:max-w-430px mx-auto md:mx-0px">{subtitle}</div>
          </div>
        ) : (
          <div>
            <h1 className="text-48px text-mild-black font-pangram font-normal mb-32px">{title}</h1>
            <div className="flex justify-center md:justify-start">
              {isLoggedIn && (
                <Button
                  variants="primary"
                  onClick={onClickSave}
                  btnClasses="flex justify-center justify-self-center button-font w-168px h-52px md:mr-16px"
                >
                  <div className="flex items-center my-auto">
                    <img className="w-22px h-19px mr-10px" src={isFavorite ? FavoriteRed : Favorite} alt="favorite" />
                    <div className="mr-10px">{saveButton}</div>
                  </div>
                </Button>
              )}
              {videoLink && (
                <Button
                  variants="black"
                  onClick={() => (modalIsOpen ? setIsOpen(false) : setIsOpen(true))}
                  btnClasses="flex justify-center justify-self-center button-font w-168px h-52px"
                >
                  <div className="flex items-center my-auto">
                    <img className="w-22px h-19px mr-10px" src={VideoIcon} alt="Video" />
                    <div className="mr-10px">View Trailer</div>
                  </div>
                </Button>
              )}
              <ModalVideo modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} modalVideoLink={videoLink} />
            </div>
          </div>
        )}
      </div>
    );
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    touchMove: false,
    className: "center",
    afterChange: index => images[index] && setNav(index),
    focusOnSelect: true,
    prevArrow: <SliderArrow classNames="prev project-prev" />,
    nextArrow: <SliderArrow classNames="next project-next" rotate />,
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
          slidesToShow: 5,
          arrows: false,
          touchMove: true,
          centerMode: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          arrows: false,
          touchMove: true,
          centerMode: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 7,
          arrows: false,
          touchMove: true,
          centerMode: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 1100,
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
          <div key={index} className="flex justify-center h-205px px-5px py-10px">
            <div className="w-full h-full mx-auto"></div>
          </div>
        );
      });
    }
  };

  return (
    <div className={`md:relative w-full hero-wrapper md:overflow-hidden bg-light-purple rounded-b-100px ${className}`}>
      <div className="px-25px lg:px-120px absolute bottom-0px left-0px right-0px">
        <div className="header-hero-section relative h-4/5">
          <div className="bg-white hero-shadow px-32px py-21px rounded-15px absolute w-full bottom-0px flex h-350px justify-between left-0px right-0px mb-32px">
            <div className="flex items-center">
              <HeroTitle className="hidden md:block z-20" />
            </div>
            <div className="hero-image">
              <Image image={images[nav]} className="w-full h-full rounded-15px" />
            </div>
          </div>
        </div>
        <div className="w-full z-20 mb-32px hero-slider-wrapper h-80px">
          <Slider ref={s => setSlider(s)} {...settings}>
            {[...images, ...images].map((img, index) => {
              return (
                <div key={index} className="flex justify-center w-125px h-80px cursor-pointer">
                  <Image image={img} className="block h-full rounded-10px" />
                </div>
              );
            })}
            {emptyTiles(images, tileCount)}
          </Slider>
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
