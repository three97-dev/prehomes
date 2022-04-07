import React from "react";
import PropTypes from "prop-types";
import Image from "../../basic/image/Image";
import { StaticImage } from "gatsby-plugin-image";

const DeveloperHeroSection = ({ developerPreviewImage }) => (
  <div className="relative md:w-470px flex md:justify-end h-300px md:h-auto">
    <StaticImage
      src="../../../assets/hero/developer-hero-image.png"
      alt="Developer hero"
      className="w-full md:w-384px"
    />
    <div className="w-300px rounded-15px h-200px bg-white flex p-16px justify-center items-center absolute top-0px md:top-40px left-40px md:-left-160px z-100">
      <Image image={developerPreviewImage} alt="Developers hero" className="w-full" />
    </div>
  </div>
);

DeveloperHeroSection.propTypes = {
  developerPreviewImage: PropTypes.string,
};

DeveloperHeroSection.defaultProps = {
  developerPreviewImage: "",
};

export default DeveloperHeroSection;
