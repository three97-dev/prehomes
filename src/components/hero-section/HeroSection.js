import React from "react";
import PropTypes from "prop-types";

import Image from "../basic/image/Image";

const HeroSection = ({
  heroTopText,
  title,
  heroContent,
  heroContentCss,
  image,
  heroLogoImage,
  isUserDashboard,
  className,
  isStaticImage,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="mx-auto text-beige h-screen md:h-500px">
        <div className="absolute w-full -z-10 overflow-hidden">
          {isStaticImage ? image : <Image image={image} className="-z-10 w-full h-screen sm+:h-500px" />}
        </div>
        <div
          className={`z-100 md:flex md:pl-121px ${
            heroLogoImage ? "justify-between md:pr-93px" : "pt-295px md:pt-0px"
          } ${isUserDashboard ? "pt-391px md:pt-0px" : ""}`}
        >
          {heroLogoImage ? <Image image={heroLogoImage} className="md:hidden -z-10 pt-247px" /> : null}
          <div className={`text-tundora md:ml-0px ${heroTopText ? "ml-27px" : ""}`}>
            <div className="md:pt-217px eyebrow-font text-black-gray md:text-dark-orange">
              {heroTopText.toUpperCase()}
            </div>
            <h1 className={`text-black-gray -mt-2px mb-18px ${heroTopText ? null : "text-center md:pl-13px pt-15px"} `}>
              {title}
            </h1>
            <div className={`max-w-318px md:max-w-430px font-bold ${heroContentCss}`}>{heroContent}</div>
          </div>
          {heroLogoImage ? <Image image={heroLogoImage} className="hidden md:block -z-10 mt-197px" /> : null}
        </div>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  heroTopText: PropTypes.string,
  title: PropTypes.string,
  heroContent: PropTypes.string,
  image: PropTypes.object,
  className: PropTypes.string,
};

HeroSection.defaultProps = {
  heroTopText: "",
  title: "",
  heroContent: "",
  image: {},
  className: "",
};

export default HeroSection;
