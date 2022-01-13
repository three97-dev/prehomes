import React from "react";
import PropTypes from "prop-types";

import flowerIcon from "../../assets/flower.svg";
import flowerPink from "../../assets/flower-pink.svg";

import Image from "../basic/image/Image";

const PremiumAndPrestigeHero = ({ heroTopText, title, heroContent, image, isBlack, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto text-beige h-screen sm+:h-500px">
        <div className="w-full absolute -z-10 overflow-hidden">
          <Image image={image} className="-z-10 w-full h-screen sm+:h-500px" />
        </div>
        <div className="z-100 sm+:flex pt-263px sm+:pt-236px pl-25px sm+:pl-50px md:pl-124px pr-38px">
          <img src={flowerPink} className="sm+:hidden w-100px h-121px mb-35px" />
          <div>
            <div
              className={`text-11px sm+:text-12px leading-24px sm+:leading-18px font-bold font-poppins ${
                isBlack ? "sm+:font-normal" : ""
              }`}
            >
              {heroTopText}
            </div>
            <div className="text-47px sm+:text-53px leading-54px sm+:leading-61px font-late-november mb-20px">
              {title}
            </div>
            <div
              className={`text-11px sm+:text-12px leading-24px sm+:leading-18px font-poppins max-w-352px ${
                isBlack ? "sm+:font-normal" : "font-bold"
              }
              `}
            >
              {heroContent}
            </div>
          </div>
          <img src={flowerPink} className="hidden sm+:block w-100px h-121px ml-58px md:ml-22px mt-12px" />
        </div>
      </div>
    </div>
  );
};

PremiumAndPrestigeHero.propTypes = {
  heroTopText: PropTypes.string,
  title: PropTypes.string,
  heroContent: PropTypes.string,
  image: PropTypes.object,
  className: PropTypes.string,
  isBlack: PropTypes.bool,
};

PremiumAndPrestigeHero.defaultProps = {
  heroTopText: "",
  isBlack: false,
  title: "",
  heroContent: "",
  image: {},
  className: "",
};

export default PremiumAndPrestigeHero;
