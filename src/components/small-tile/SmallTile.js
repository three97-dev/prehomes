import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Image from "../basic/image/Image";
import FavoriteButton from "../favorite-button/FavoriteButton";

import UniversalLink from "../../utils/UniversalLink";

import { SAVE_PROJECT_TRIGGER } from "../../redux/actions/save-project";
import { DELETE_PROJECT_TRIGGER } from "../../redux/actions/save-project";

const SmallTile = ({ id, image, link, title, location, price, textColor, bgColor, className, imageClassName }) => {
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

  return (
    <div
      className={`w-216px md:w-291px h-323px md:h-379px rounded-15px filter drop-shadow-tile px-10px md:px-20px ${className}`}
    >
      <UniversalLink link={link}>
        <div className={`relative rounded-t-15px overflow-hidden w-196px md:w-251px h-192px md:h-246px filter drop-shadow-none ${imageClassName}`}>
          <Image image={image} className="h-full object-cover" />
          <div className="absolute top-9px md:top-13px right-7px md:right-11px">
            <FavoriteButton onClick={saveUnsaveProjectButton} isFavorite={isFavorite} className="m-6px" />
          </div>
        </div>
        <div
          className={`rounded-b-15px p-20px ${bgColor ? bgColor : "bg-white"} ${
            textColor ? textColor : "text-tundora"
          }`}
        >
          <div className="h-36px md:h-44px overflow-ellipsis overflow-hidden text-18px md:text-22px leading-18px md:leading-22px font-metropolis">
            {title}
          </div>
          <div className="text-10px font-metropolis font-bold my-10px">{location.toUpperCase()}</div>
          <div
            className={`text-14px md:text-16px leading-14px md:leading-16px font-metropolis font-bold ${
              textColor ? textColor : "text-black"
            }`}
          >
            From: ${price.toLocaleString("en-US")}
          </div>
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
};

export default SmallTile;
