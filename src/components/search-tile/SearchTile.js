import React, { useCallback } from "react";
import Image from "../basic/image/Image";
import { useSelector, useDispatch } from "react-redux";

import FavoriteButton from "../favorite-button/FavoriteButton";

import UniversalLink from "../../utils/UniversalLink";

import { SAVE_PROJECT_TRIGGER } from "../../redux/actions/save-project";
import { DELETE_PROJECT_TRIGGER } from "../../redux/actions/save-project";

import "./SearchTile.css";

function SearchTile({ id, image, title, city, neighborhood, price, link, className }) {
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
    <div className={`relative rounded-15px overflow-hidden w-188px h-292px filter drop-shadow-tile ${className}`}>
      <UniversalLink link={link}>
        {image ? (
          <Image image={image} className="h-full filter brightness-50 object-cover" />
        ) : (
          <div className="w-full h-full bg-premium-gray"></div>
        )}
        <FavoriteButton
          onClick={saveUnsaveProjectButton}
          isFavorite={isFavorite}
          className="absolute top-7px right-5px w-30px h-27px m-6px"
        />
        <div className="absolute w-full top-62px">
          <div className="w-148px text-white mx-auto">
            <h3 className="search-tile-title h-80px">{title}</h3>
            <div className="my-20px">
              <div className="eyebrow-font h-19px">{city && city.toUpperCase()}</div>
              <div className="eyebrow-alt-font h-19px">{neighborhood && neighborhood.toUpperCase()}</div>
            </div>
            <h4>{price}</h4>
          </div>
        </div>
      </UniversalLink>
    </div>
  );
}

export default SearchTile;
