import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Favorite from "../../assets/tiles/favorite.svg";
import FavoriteRed from "../../assets/tiles/favorite-red.svg";

import ModalLogin from "../modal-login/ModalLogin";
import ModalCongratulations from "../modal-congratulations/ModalCongratulations";


import { SAVE_PROJECT_TRIGGER } from "../../redux/actions/save-project";
import { DELETE_PROJECT_TRIGGER } from "../../redux/actions/save-project";

import "./FavoriteButton.css";

const FavoriteButton = ({ className, buttonProjectId }) => {
  const dispatch = useDispatch();

  const session = useSelector(state => state.session);
  const saveProject = useSelector(state => state.saveProject);

  const [isModalCongratulationsOpen, setIsModalCongratulationsOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

  const isFavorite = buttonProjectId && saveProject.savedProjects.some(projectId => projectId === buttonProjectId);

  useEffect(() => {
    const page = JSON.parse(localStorage.getItem("page"));

    if (page && buttonProjectId === page.id) {
      if (session.isLoggedIn && saveProject.isFetched) {
        if (session.hubspotContact === "created") {
          setIsModalCongratulationsOpen(true);
        }
        if (!isFavorite) {
          dispatch({ type: SAVE_PROJECT_TRIGGER, email: session.email, projectId: buttonProjectId });
        }
        window.scrollTo(0, page.pageScrollPosition);

        // remove saved return values
        localStorage.removeItem("page");
      }
    }
  }, [session, saveProject]);


  const saveUnsaveProjectButton = useCallback(
    e => {
      e.preventDefault();
      if (isFavorite) {
        dispatch({ type: DELETE_PROJECT_TRIGGER, email: session.email, projectId: buttonProjectId });
      } else {
        dispatch({ type: SAVE_PROJECT_TRIGGER, email: session.email, projectId: buttonProjectId });
      }
    },
    [isFavorite, buttonProjectId, session, dispatch]
  );

  return (
    <>
      <ModalLogin
        modalIsOpen={isModalLoginOpen}
        onClose={() => setIsModalLoginOpen(false)}
        favoriteButtonId={buttonProjectId}
      />
      <ModalCongratulations
        modalIsOpen={isModalCongratulationsOpen}
        onClose={() => {
          setIsModalCongratulationsOpen(false);
        }}
      />
      <button
        onClick={
          session.isLoggedIn
            ? saveUnsaveProjectButton
            : event => {
                event.preventDefault();
                setIsModalLoginOpen(true);
              }
        }
        className={`outline-none ${className}`}
      >
        <img src={isFavorite ? FavoriteRed : Favorite} alt="favorite" className="favoriteButton" />
      </button>
    </>
  );
};

FavoriteButton.propTypes = {
  className: PropTypes.string,
};

FavoriteButton.defaultProps = {
  className: "",
};

export default FavoriteButton;
