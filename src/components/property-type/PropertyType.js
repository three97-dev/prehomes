import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import PropTypes from "prop-types";
import "./PropertyType.css";
import Image from "../basic/image/Image";

const PropertyType = ({ projectType }) => {
  const { projectTypePreviewImage, name } = projectType;
  return (
    <div className="property-type-item border border-minty-green flex flex-col justify-center items-center rounded-5px">
      {projectTypePreviewImage ? (
        <Image image={projectTypePreviewImage} className="property-type-image" />
      ) : (
        <StaticImage src="../../assets/property-type/property-type.svg" className="property-type-image" />
      )}
      <h4 className="font-light text-14px md:text-16px text-white pt-16px md:pt-24px mx-40px md:mx-32px">{name}</h4>
    </div>
  );
};

PropertyType.propTypes = {
  projectType: PropTypes.object,
};

PropertyType.defaultProps = {
  projectType: {},
};

export default PropertyType;
