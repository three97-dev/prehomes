import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Favorite from "../../assets/tiles/favorite.svg";
import FavoriteRed from "../../assets/tiles/favorite-red.svg";

import "./FavoriteButton.css";

const FavoriteButton = ({ isFavorite, onClick, className }) => {
  const { isLoggedIn } = useSelector(state => state.session);

  return isLoggedIn ? (
    <button onClick={onClick} className={`outline-none ${className}`}>
      <img src={isFavorite ? FavoriteRed : Favorite} alt="favorite" className="favoriteButton" />
    </button>
  ) : null;
};

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

FavoriteButton.defaultProps = {
  isFavorite: false,
  onClick: () => {},
  className: "",
};

export default FavoriteButton;
