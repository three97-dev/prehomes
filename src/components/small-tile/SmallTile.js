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
    <div
      className={`relative w-216px md:w-291px h-323px md:h-379px rounded-15px filter drop-shadow-tile px-10px md:px-20px ${className}`}
    >
      <div className="absolute z-10 top-9px md:top-13px right-17px md:right-31px">
        <FavoriteButton
          buttonProjectId={id}
          className="m-6px"
        />
      </div>
      <UniversalLink link={link}>
        <div
          className={` rounded-t-15px overflow-hidden w-196px md:w-251px h-192px md:h-246px filter drop-shadow-none ${imageClassName}`}
        >
          {specialIncentive && (
            <div className="ribbon-wrapper">
              <div
                className="ribbon"
                style={{
                  backgroundImage: `url(${ribbon})`,
                }}
              >
                <p>{specialIncentive.specialIncentiveDescription}</p>
              </div>
            </div>
          )}
          <Image image={image} className="w-full h-full object-cover" />
        </div>
        <div
          className={`rounded-b-15px pt-20px md:pt-12px pb-20px md:pb-25px px-20px ${bgColor ? bgColor : "bg-white"} ${
            textColor ? textColor : "text-black-gray"
          }`}
        >
          <h3 className={`small-tile-title md:h-54px overflow-ellipsis overflow-hidden ${titleClassName}`}>{title}</h3>
          <div className={`eyebrow-font mb-10px mt-10px ${subtitleClassName}`}>{location}</div>
          <h4 className={`${textColor ? textColor : "text-black-gray"}`}>
            From: ${price ? price.toLocaleString("en-US") : ""}
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
