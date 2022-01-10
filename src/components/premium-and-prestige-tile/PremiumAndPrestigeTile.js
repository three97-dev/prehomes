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
      className={`box-shadow relative border w-196px md:w-346px text-center rounded-15px overflow-hidden ${
        blackVariant ? "bg-white-asphalt box-shadow border-white-asphalt" : "bg-dark-green border-dark-green"
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
        <div className="py-20px px-20px md:px-21px text-white">
          <div className="flex items-center justify-center h-36px md:h-70px mb-10px md:mb-23px overflow-ellipsis overflow-hidden text-left md:text-center text-18px md:text-29px leading-17px md:leading-29px md:font-bold font-metropolis  md:font-rosario tracking-wide">
            {tileTitle}
          </div>
          <div className="md:h-54px mb-10px md:mb-19px overflow-ellipsis overflow-hidden text-left md:text-center text-11px md:text-16px leading-11px md:leading-18px font-metropolis md:font-late-november font-bold md:font-normal">
            {isDesktop ? tileContent : location}
          </div>
          <div className="text-left md:text-center text-14px md:text-16px leading-14px md:leading-16px font-metropolis font-bold md:mb-10px">
            {isDesktop ? "Starting from:" : "From:"} ${tilePrice.toLocaleString("en-US")}
          </div>
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
