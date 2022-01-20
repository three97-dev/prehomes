import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";

import UniversalLink from "../../utils/UniversalLink";
import headerLinks from "../../config/headerLinks";

import BurgerMenuActiveImage from "../../assets/header/burger-menu-active.svg";

import { GOOGLE_LOGIN_TRIGGER, GOOGLE_LOGOUT_TRIGGER } from "../../redux/actions/session";
import { GET_PROJECTS_TRIGGER } from "../../redux/actions/save-project";
import { GET_FLOOR_PLANS_TRIGGER } from "../../redux/actions/save-floor-plan";

import "./BurgerMenu.css";

const ListItem = ({ name, link, image, onClick }) => {
  return (
    <UniversalLink link={link} onClick={onClick} className="flex items-center w-full pt-27px pb-27px">
      <img src={image} alt={name} className="ml-4px mr-38px" />
      <div className="link-font text-black">{name}</div>
    </UniversalLink>
  );
};

const BurgerMenu = ({ modalIsOpen, onClose }) => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const [waitingForLoginRedirect, setWaitingForLoginRedirect] = useState(false);

  const linksWithoutDashboard = headerLinks.filter(item => item.link !== "/user-dashboard");
  const shownLinks = session.isLoggedIn ? headerLinks : linksWithoutDashboard;

  const userButton = useCallback(() => {
    if (session.isLoggedIn === false) {
      dispatch({ type: GOOGLE_LOGIN_TRIGGER });
      setWaitingForLoginRedirect(true);
    } else {
      navigate("/user-dashboard");
    }
  }, [session, dispatch, setWaitingForLoginRedirect]);

  useEffect(() => {
    if (waitingForLoginRedirect && session.googleLoginUrl) {
      // go to Google Login Page
      window.location = session.googleLoginUrl;
    } else if (session.isLoggedIn) {
      dispatch({ type: GET_PROJECTS_TRIGGER, email: session.email });
      dispatch({ type: GET_FLOOR_PLANS_TRIGGER, email: session.email });
    }
  }, [session, waitingForLoginRedirect, dispatch]);
  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={() => onClose()}
      className="burger-menu"
      overlayClassName="burger-menu-overlay"
    >
      <div className="burger-menu-container">
        <div className="burger-menu-button bg-white grid justify-items-center">
          <button
            onClick={() => onClose()}
            className={`button-circle-shadow rounded-full w-45px h-45px md:w-68px md:h-65px bg-black-gray mt-28px md:mt-13px`}
          >
            <img src={BurgerMenuActiveImage} alt="button-icon" className="mx-auto" />
          </button>
        </div>
        <div className="burger-menu-list bg-white pl-22px pr-28px">
          {shownLinks.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem link={item.link} name={item.name} image={item.image} />
              <div className="w-full border-t border-shadow" />
            </React.Fragment>
          ))}
          <ListItem
            onClick={session.isLoggedIn ? () => dispatch({ type: GOOGLE_LOGOUT_TRIGGER }) : userButton}
            name={session.isLoggedIn ? "Logout" : "Login"}
            image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTkiIHZpZXdCb3g9IjAgMCAxOSAxOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuOTE2NjcgNC43NUM3LjkxNjY3IDQuMzMwMDcgOC4wODM0OCAzLjkyNzM1IDguMzgwNDEgMy42MzA0MUM4LjY3NzM1IDMuMzMzNDggOS4wODAwNyAzLjE2NjY3IDkuNSAzLjE2NjY3QzkuOTE5OTMgMy4xNjY2NyAxMC4zMjI3IDMuMzMzNDggMTAuNjE5NiAzLjYzMDQxQzEwLjkxNjUgMy45MjczNSAxMS4wODMzIDQuMzMwMDcgMTEuMDgzMyA0Ljc1VjcuOTE2NjdIMTQuMjVWNC43NUMxNC4yNSAzLjQ5MDIyIDEzLjc0OTYgMi4yODIwNCAxMi44NTg4IDEuMzkxMjRDMTEuOTY4IDAuNTAwNDQ1IDEwLjc1OTggMCA5LjUgMEM4LjI0MDIyIDAgNy4wMzIwNCAwLjUwMDQ0NSA2LjE0MTI0IDEuMzkxMjRDNS4yNTA0NSAyLjI4MjA0IDQuNzUgMy40OTAyMiA0Ljc1IDQuNzVWNy45MTY2N0g3LjkxNjY3VjQuNzVaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTUuODMyIDkuNUgzLjE2NTM2QzIuMjkwOTEgOS41IDEuNTgyMDMgMTAuMjA4OSAxLjU4MjAzIDExLjA4MzNWMTcuNDE2N0MxLjU4MjAzIDE4LjI5MTEgMi4yOTA5MSAxOSAzLjE2NTM2IDE5SDE1LjgzMkMxNi43MDY1IDE5IDE3LjQxNTQgMTguMjkxMSAxNy40MTU0IDE3LjQxNjdWMTEuMDgzM0MxNy40MTU0IDEwLjIwODkgMTYuNzA2NSA5LjUgMTUuODMyIDkuNVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo="
          />
        </div>
      </div>
    </Modal>
  );
};

BurgerMenu.propTypes = {
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

BurgerMenu.defaultProps = {
  modalIsOpen: false,
  onClose: () => {},
};

export default BurgerMenu;
