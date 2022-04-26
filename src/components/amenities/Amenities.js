import React from "react";
import PropTypes from "prop-types";

import checkCircle from "../../assets/amenities/check-circle-grey.svg";

import "./Amenities.css";

const ProjectAmenities = ({ title, amenities, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <h2 className="heading mb-24px md:mb-32px">{title}</h2>
      <ul className="sm+:amenities-list">
        {amenities.map((amenity, index) => (
          <li key={index} className="flex items-center pb-24px md:pb-32px amenity-list-item">
            <img src={checkCircle} alt="check circle" />
            <p className="pl-24px text-16px text-mild-black font-normal">{amenity.label}</p>
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
