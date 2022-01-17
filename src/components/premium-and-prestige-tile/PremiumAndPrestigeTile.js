import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Image from "../basic/image/Image";
import Button from "../basic/button/Button";
import FavoriteButton from "../favorite-button/FavoriteButton";
import UniversalLink from "../../utils/UniversalLink";

import { SAVE_PROJECT_TRIGGER } from "../../redux/actions/save-project";
import { DELETE_PROJECT_TRIGGER } from "../../redux/actions/save-project";
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
  const dispatch = useDispatch();
  const saveProject = useSelector(state => state.saveProject);
  const session = useSelector(state => state.session);
  const isFavorite = saveProject.savedProjects.some(projectId => projectId === id);
  const saveUnsaveProjectButton = useCallback(
    e => {
      e.preventDefault();
      if (isFavorite) {
        dispatch({ type: DELETE_PROJECT_TRIGGER, email: session.email, projectId: id });
      } else {
        dispatch({ type: SAVE_PROJECT_TRIGGER, email: session.email, projectId: id });
      }
    },
    [isFavorite, session, dispatch]
  );
  const isDesktop = useApplyAfterWidth(833);
  return (
    <div
      className={`box-shadow relative w-196px md:w-346px text-center rounded-15px overflow-hidden filter drop-shadow-none ${
        blackVariant ? "bg-white-asphalt box-shadow" : "bg-dark-green"
      } ${className}`}
    >
      <UniversalLink link={buttonLink}>
        <Image image={image} className="h-192px md:h-265px" />
        {session && session.isLoggedIn ? (
          <FavoriteButton
            onClick={saveUnsaveProjectButton}
            isFavorite={isFavorite}
            className="absolute top-13px right-11px m-6px"
          />
        ) : null}
        <div className="pt-20px md:pt-15px pb-20px px-20px md:px-21px text-white md:text-white-pink">
          <h3 className="premium-and-prestige-tile-title flex items-center justify-center h-68px md:h-55px mb-11px md:mb-15px text-left md:text-center tracking-wide">
            {tileTitle}
          </h3>
          <p className="md:h-96px mb-18px md:mb-19px overflow-ellipsis overflow-hidden text-left md:text-center">
            {isDesktop ? tileContent : location}
          </p>
          <h4 className="text-left md:text-center mb-5px md:mb-0px">
            {isDesktop ? "Starting from:" : "From:"} ${tilePrice.toLocaleString("en-US")}
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
