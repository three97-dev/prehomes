import React from "react";
import PropTypes from "prop-types";

import flowerIcon from "../../assets/flower.svg";

import Image from "../basic/image/Image";

const PremiumAndPrestigeHero = ({ heroTopText, title, heroContent, image, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto text-beige h-screen sm+:h-500px">
        <div className="w-full absolute -z-10 overflow-hidden">
          <Image image={image} className="-z-10 w-full h-screen sm+:h-500px" />
        </div>
        <div className="z-100 sm+:flex pt-263px sm+:pt-217px pl-27px sm+:pl-50px md:pl-112px">
          <img src={flowerIcon} className="sm+:hidden w-100px h-121px mb-35px" />
          <div>
            <div className="text-11px sm+:text-14px leading-11px sm+:leading-12px font-bold font-metropolis">
              {heroTopText}
            </div>
            <div className="text-29px sm+:text-47px leading-29px sm+:leading-54px font-late-november sm+:-mt-2px mb-22px">
              {title}
            </div>
            <div className="text-14px sm+:text-16px leading-16px sm+:leading-18px font-late-november max-w-328px">
              {heroContent}
            </div>
          </div>
          <img src={flowerIcon} className="hidden sm+:block w-100px h-121px ml-58px mt-12px" />
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
};

PremiumAndPrestigeHero.defaultProps = {
  heroTopText: "",
  title: "",
  heroContent: "",
  image: {},
  className: "",
};

export default PremiumAndPrestigeHero;
