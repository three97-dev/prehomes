import React from "react";
import PropTypes from "prop-types";

import checkCircle from "../../assets/amenities/check-circle.svg";

import "./Amenities.css";

const ProjectAmenities = ({ title, amenities, className }) => {
  return (
    <div className={`w-full bg-white-pink md:bg-transparent ${className}`}>
      <div className="text-29px leading-29px font-bold font-metropolis text-tundora py-20px pr-20px">{title}</div>
      <ul className="sm+:amenities-list">
        {amenities.map((amenity, index) => (
          <li key={index} className="relative pl-60px pr-20px pt-21px pb-20px">
            <img className="absolute top-14px left-6px" src={checkCircle} alt="check circle" />
            <div className="text-14px md:text-16px leading-14px md:leading-16px font-metropolis text-dark-gray">
              {amenity.label.toUpperCase()}
            </div>
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
