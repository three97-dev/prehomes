import React from "react";
import PropTypes from "prop-types";
import "./HeroSection.css";
import UniversalLink from "../../utils/UniversalLink";

const HeroSection = ({
  heroTopText,
  title,
  rightHeroContent,
  className,
  viewAllText,
  viewAllLink,
  viewAllClassName,
}) => {
  return (
    <div className={`hero-wrapper relative w-full ${className}`}>
      <div className="mx-auto text-beige h-650px md:h-500px">
        <div className="flex flex-col md:flex-row justify-between items-end absolute bottom-0px z-100 w-full md:px-120px">
          <div className="w-full md:w-500px mb-54px md:mb-153px px-25px md:px-0px">
            <h2 className="font-pangram font-normal text-40px md:text-48px text-mild-black leading-44px md:leading-54px">
              {heroTopText}
            </h2>
            <h2 className="font-pangram font-normal text-deep-purple text-40px  md:text-48px leading-44px md:leading-54px">
              {title}
            </h2>
          </div>
          {viewAllText && viewAllLink && (
            <UniversalLink
              className={`hidden md:block absolute bottom-0px text-12px font-bold text-deep-purple underline ${viewAllClassName}`}
              link={viewAllLink}
            >
              {viewAllText}
            </UniversalLink>
          )}
          {rightHeroContent && rightHeroContent}
        </div>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  heroTopText: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.object,
  className: PropTypes.string,
  viewAllLink: PropTypes.string,
  viewAllText: PropTypes.string,
  viewAllClassName: PropTypes.string,
};

HeroSection.defaultProps = {
  heroTopText: "",
  title: "",
  image: {},
  className: "",
  viewAllLink: "",
  viewAllText: "",
  viewAllClassName: "",
};

export default HeroSection;
