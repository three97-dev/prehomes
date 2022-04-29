import React from "react";
import PropTypes from "prop-types";

import Image from "../basic/image/Image";
import FavoriteButton from "../favorite-button/FavoriteButton";

import UniversalLink from "../../utils/UniversalLink";

import ribbon from "../../assets/ribbon/ribbon.svg";

import "./SmallTile.css";

const SmallTile = ({
  id,
  image,
  link,
  title,
  location,
  price,
  textColor,
  bgColor,
  className,
  imageClassName,
  titleClassName,
  subtitleClassName,
  specialIncentive,
}) => {
  return (
    <div className={`relative w-full px-8px border border-mild-purple rounded-5px ${className}`}>
      <div className="absolute z-10 top-22px right-17px md:right-22px">
        <FavoriteButton buttonProjectId={id} className="m-6px" />
      </div>
      <UniversalLink link={link}>
        <div className={`rounded-5px overflow-hidden w-full h-200px mx-0px  ${imageClassName}`}>
          <Image image={image} className="w-full h-full object-cover filter img-shadow mt-8px rounded-5px" />
        </div>
        <div
          className={`text-center pt-16px pb-8px px-8px ${bgColor ? bgColor : "bg-white"} ${
            textColor ? textColor : "text-black-gray"
          }`}
        >
          {specialIncentive && (
            <div className="ribbon-wrapper">
              <p className="text-white text-12px font-bold font-pangram">
                {specialIncentive.specialIncentiveDescription}
              </p>
            </div>
          )}
          <h3
            className={`font-poppins font-bold text-16px small-tile-title overflow-ellipsis overflow-hidden h-50px md:h-auto md:mb-8px`}
          >
            {title}
          </h3>
          <div className={`font-pangram font-normal mb-16px text-mild-purple text-12px ${subtitleClassName}`}>
            {location}
          </div>
          <h4 className="text-12px font-pangram font-bold">Pricing from:</h4>
          <h4 className={`font-normal text-16px mt-8px ${textColor ? textColor : "text-black-gray"}`}>
            {price ? `\$${price.toLocaleString("en-US")}` : "Please contact"}
          </h4>
        </div>
      </UniversalLink>
    </div>
  );
};

SmallTile.propTypes = {
  image: PropTypes.object,
  link: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.number,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  className: PropTypes.string,
  specialIncentive: PropTypes.object,
};

SmallTile.defaultProps = {
  image: {},
  link: "",
  title: "",
  location: "",
  price: "",
  textColor: "",
  bgColor: "",
  className: "",
  titleClassName: "h-69px",
  subtitleClassName: "mb-10px uppercase",
  specialIncentive: null,
};

export default SmallTile;
