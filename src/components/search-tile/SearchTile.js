import React, { useCallback } from "react";
import Image from "../basic/image/Image";
import { useSelector, useDispatch } from "react-redux";

import FavoriteButton from "../favorite-button/FavoriteButton";

import UniversalLink from "../../utils/UniversalLink";

import { SAVE_PROJECT_TRIGGER } from "../../redux/actions/save-project";
import { DELETE_PROJECT_TRIGGER } from "../../redux/actions/save-project";

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
    <div className={`relative rounded-15px overflow-hidden w-188px h-277px filter drop-shadow-tile ${className}`}>
      <UniversalLink link={link}>
        {image ? (
          <Image image={image} className="h-full filter brightness-50 object-cover" />
        ) : (
          <div className="w-full h-full bg-premium-gray"></div>
        )}
        <FavoriteButton
          onClick={saveUnsaveProjectButton}
          isFavorite={isFavorite}
          className="absolute top-13px right-11px w-30px h-27px m-6px"
        />
        <div className="absolute w-full top-138px">
          <div className="w-148px text-white font-metropolis font-bold mx-auto">
            <div className="flex items-end h-66px overflow-ellipsis overflow-hidden text-22px leading-22px">
              {title}
            </div>
            <div className="my-10px">
              <div className="text-14px leading-14px -my-4px font-bold">{city}</div>
              <div className="text-10px leading-10px font-normal mt-2px">{neighborhood}</div>
            </div>
            <div className="font-rosario text-14px leading-17px">{price}</div>
          </div>
        </div>
      </UniversalLink>
    </div>
  );
}

export default SearchTile;
