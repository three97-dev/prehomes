import React from "react";
import PropTypes from "prop-types";

import Image from "../basic/image/Image";
import FavoriteButton from "../favorite-button/FavoriteButton";
import UniversalLink from "../../utils/UniversalLink";

import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import "./PremiumAndPrestigeTile.css";

const PremiumAndPrestigeTile = ({
  blackVariant,
  buttonLink,
  id,
  image,
  location,
  tileTitle,
  tileContent,
  tilePrice,
  className,
}) => {
  const isDesktop = useApplyAfterWidth(833);

  return (
    <div
      className={`box-shadow relative w-196px md:w-346px text-center rounded-15px overflow-hidden filter drop-shadow-none ${
        blackVariant ? "bg-white-asphalt box-shadow" : "bg-dark-green"
      } ${className}`}
    >
      <FavoriteButton
        buttonProjectId={id}
        className="absolute top-13px right-11px m-6px z-10"
      />
      <UniversalLink link={buttonLink}>
        <Image image={image} className="h-192px md:h-265px" />

        <div className="pt-20px md:pt-22px pb-20px px-20px md:px-21px text-white md:text-white-pink">
          <h3 className="premium-and-prestige-tile-title flex items-center justify-center h-68px md:h-55px mb-11px md:mb-18px text-left md:text-center tracking-wide">
            {tileTitle}
          </h3>
          <p className="md:h-104px mb-18px md:mb-28px overflow-ellipsis overflow-hidden text-left md:text-center">
            {isDesktop ? tileContent : location}
          </p>
          <h4 className="text-left md:text-center mb-5px">
            {isDesktop ? "Starting from:" : "From:"} ${tilePrice ? tilePrice.toLocaleString("en-US") : ""}
          </h4>
        </div>
      </UniversalLink>
    </div>
  );
};

PremiumAndPrestigeTile.propTypes = {
  blackVariant: PropTypes.bool,
  image: PropTypes.object,
  isLikeButton: PropTypes.bool,
  buttonLabel: PropTypes.string,
  tileTitle: PropTypes.string,
  tileContent: PropTypes.string,
  tilePrice: PropTypes.number,
  className: PropTypes.string,
};

PremiumAndPrestigeTile.defaultProps = {
  blackVariant: false,
  isLikeButton: false,
  image: {},
  tileTitle: "",
  tileContent: "",
  buttonLabel: "",
  tilePrice: "",
  className: "",
};

export default PremiumAndPrestigeTile;
