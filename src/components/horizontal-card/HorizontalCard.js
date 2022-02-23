import React from "react";
import PropTypes from "prop-types";
import Image from "../basic/image/Image";
import "./HorizontalCard.css";
import UniversalLink from "../../utils/UniversalLink";

const HorizontalCard = ({ image, title, pageUrl }) => (
  <UniversalLink
    link={pageUrl}
    className="horizontal-card-wrapper flex h-105px md:h-161px mb-27px rounded-15px shadow-md border border-silver justify-between"
  >
    <Image image={image} className="w-2/5 md:w-2/6 rounded-l-15px h-full" />
    <div className="w-3/5 md:w-4/6 p-22px">
      <h2 className="horizontal-card-name">{title}</h2>
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

HorizontalCard.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  pageUrl: PropTypes.string,
};

HorizontalCard.defaultProps = {
  image: {},
  title: "",
  pageUrl: "",
};

export default HorizontalCard;