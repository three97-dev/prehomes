import React from "react";
import PropTypes from "prop-types";
import "./CityHeroSection.css";
import Image from "../../basic/image/Image";

const CityHeroSection = ({ images, heroIndex }) => (
  <div className="relative w-full md:w-450px h-400px md:h-auto px-25px md:px-0px flex justify-center md:justify-start">
    <div className="absolute w-308px md:w-450px h-300px bottom-32px rounded-15px left-25px md:right-32px bg-white"></div>
    <div className="absolute w-308px md:w-450px h-300px bottom-16px rounded-15px right-25px md:right-48px border border-deep-purple"></div>
    <Image image={images[heroIndex]} alt="City hero" className="h-300px w-308px md:w-450px rounded-8px" />
  </div>
);

CityHeroSection.propTypes = {
  images: PropTypes.array,
  heroIndex: PropTypes.number,
};

CityHeroSection.defaultProps = {
  images: [],
  heroIndex: 0,
};

export default CityHeroSection;
