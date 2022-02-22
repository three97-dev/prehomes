import React from "react";
import PropTypes from "prop-types";
import Image from "../basic/image/Image";
import "./City.css";
import UniversalLink from "../../utils/UniversalLink";

const City = ({ city }) => (
  <UniversalLink
    link={city.fields.pageUrl}
    className="city-wrapper flex h-105px md:h-161px mb-27px rounded-15px shadow-md border border-silver justify-between"
  >
    <Image image={city.cityImages[0]} className="w-2/5 md:w-2/6 rounded-l-15px h-full" />
    <div className="w-3/5 md:w-4/6 p-22px">
      <h2 className="city-name">{city.cityName}</h2>
      <div className="stat-container mb-10px">
        <h4 className="stat-value">125</h4>
        <h4 className="stat-title">New Listings</h4>
      </div>
      <div className="stat-container">
        <h4 className="stat-value">125</h4>
        <h4 className="stat-title">Special Incentives</h4>
      </div>
    </div>
  </UniversalLink>
);

City.propTypes = {
  city: PropTypes.object,
};

City.defaultProps = {
  city: {},
};

export default City;
