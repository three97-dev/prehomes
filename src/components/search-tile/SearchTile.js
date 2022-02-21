import React from "react";
import Image from "../basic/image/Image";

import FavoriteButton from "../favorite-button/FavoriteButton";

import UniversalLink from "../../utils/UniversalLink";

import "./SearchTile.css";

function SearchTile({ id, image, title, city, neighborhood, price, link, className }) {
  return (
    <div className={`relative rounded-15px overflow-hidden w-188px h-292px filter drop-shadow-tile ${className}`}>
      <FavoriteButton
        buttonProjectId={id}
        className="absolute top-7px right-5px w-30px h-27px m-6px z-10"
      />
      <UniversalLink link={link}>
        {image ? (
          <Image image={image} className="h-full filter brightness-50 object-cover" />
        ) : (
          <div className="w-full h-full bg-premium-gray"></div>
        )}
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
