import React from "react";
import PropTypes from "prop-types";

import flowerPink from "../../assets/flower-pink.svg";

const PremiumAndPrestigeHero = ({ heroTopText, title, heroContent, image, isBlack, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto text-white-pink h-screen sm+:h-500px">
        <div className="w-full absolute -z-10 overflow-hidden">{image}</div>
        <div className="z-100 sm+:flex pt-263px sm+:pt-236px pl-25px sm+:pl-50px md:pl-124px pr-38px">
          <img src={flowerPink} className="sm+:hidden w-100px h-121px mb-35px" />
          <div>
            <div className={`eyebrow-font ${isBlack ? "sm+:font-normal" : ""}`}>{heroTopText}</div>
            <h1 className="mb-20px">{title}</h1>
            <div
              className={`max-w-352px footer-font ${isBlack ? "sm+:font-normal" : ""}
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
