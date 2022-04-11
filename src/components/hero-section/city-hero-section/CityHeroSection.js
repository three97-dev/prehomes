import React from "react";
import PropTypes from "prop-types";
import "./CityHeroSection.css";
import Image from "../../basic/image/Image";

const CityHeroSection = ({ images, heroIndex }) => (
  <div className="city-hero-container">
    <Image image={images[heroIndex]} alt="City hero" className="city-hero-image" />
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
