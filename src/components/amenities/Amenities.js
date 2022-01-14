import React from "react";
import PropTypes from "prop-types";

import checkCircle from "../../assets/amenities/check-circle.svg";

import "./Amenities.css";

const ProjectAmenities = ({ title, amenities, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <h2 className="text-black-gray py-20px md:pt-30px md:pb-40px pr-20px">{title}</h2>
      <ul className="sm+:amenities-list">
        {amenities.map((amenity, index) => (
          <li key={index} className="relative pl-60px pr-20px pt-21px pb-20px">
            <img className="absolute top-14px left-6px" src={checkCircle} alt="check circle" />
            <p className="text-black-gray">{amenity.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProjectAmenities.propTypes = {
  title: PropTypes.string,
  amenities: PropTypes.array,
  className: PropTypes.string,
};

ProjectAmenities.defaultProps = {
  title: "",
  amenities: [],
  className: "",
};

export default ProjectAmenities;
