import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "@reach/router";

import { GOOGLE_LOGIN_TRIGGER } from "../../redux/actions/session";

import "./ModalLogin.css";

const ModalLogin = ({ modalIsOpen, onClose, favoriteButtonId }) => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const [waitingForLoginRedirect, setWaitingForLoginRedirect] = useState(false);

  const location = useLocation();

  const userButton = useCallback(
    event => {
      event.preventDefault();
      if (session.isLoggedIn === false) {
        dispatch({ type: GOOGLE_LOGIN_TRIGGER });
        setWaitingForLoginRedirect(true);

        localStorage.setItem(
          "page",
          JSON.stringify({ pageUrl: location.pathname, pageScrollPosition: window.pageYOffset, id: favoriteButtonId })
        );
      }
    },
    [session, dispatch, setWaitingForLoginRedirect]
  );

  useEffect(() => {
    if (waitingForLoginRedirect && session.googleLoginUrl) {
      // go to Google Login Page
      window.location = session.googleLoginUrl;
    }
  }, [session, waitingForLoginRedirect]);

  if (modalIsOpen === false) {
    return null;
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={() => onClose()}
      className="modal-login"
      overlayClassName="modal-login-overlay"
    >
      <div className="modal-login-container">
        <div className="modal-login-content justify-items-center">
          <h2 className="text-tundora">Welcome to Prehomes.</h2>
          <div>
            <p className="text-black-gray mt-20px modal-form-text">
              You’ clicked to <span className="font-bold">add a “favourite” to your personalized list</span> of
              pre-construction homes.
            </p>
            <p className="text-black-gray mt-24px modal-form-text">
              By signing in below, you’ll have your own place to start favouriting preconstruction projects and floor
              plans. Simply sign-in below and we’ll bring you to your personalized page where you can stay up to date
              with projects you’ve selected.
            </p>
          </div>
          <button onClick={userButton} className="p-20px rounded-15px modal-login-button border border-beige mt-25px">
            <div className="flex items-center bg-light-blue px-32px w-298px py-15px rounded-9px">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjM3NjEgMTMuMjUyNkMyNC4zNzYxIDEyLjMxNzQgMjQuMjk4NyAxMS42MzQ5IDI0LjEzMTEgMTAuOTI3MUgxMy4yMzMzVjE1LjE0ODRIMTkuNjMwMUMxOS41MDExIDE2LjE5NzUgMTguODA0NyAxNy43Nzc0IDE3LjI1NzEgMTguODM5TDE3LjIzNTQgMTguOTgwM0wyMC42ODExIDIxLjU5NjJMMjAuOTE5OCAyMS42MTk2QzIzLjExMjIgMTkuNjM1MyAyNC4zNzYxIDE2LjcxNTcgMjQuMzc2MSAxMy4yNTI2WiIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTMuMjMyNiAyNC4zNzVDMTYuMzY2NCAyNC4zNzUgMTguOTk3NCAyMy4zNjM4IDIwLjkxOSAyMS42MTk3TDE3LjI1NjMgMTguODM5QzE2LjI3NjIgMTkuNTA4OSAxNC45NjA3IDE5Ljk3NjYgMTMuMjMyNiAxOS45NzY2QzEwLjE2MzIgMTkuOTc2NiA3LjU1ODA0IDE3Ljk5MjMgNi42MjkzOCAxNS4yNDk2TDYuNDkzMjYgMTUuMjYxTDIuOTEwNCAxNy45Nzg0TDIuODYzNTQgMTguMTA2QzQuNzcyMjQgMjEuODIxOCA4LjY5Mjg3IDI0LjM3NSAxMy4yMzI2IDI0LjM3NVoiIGZpbGw9IiMzNEE4NTMiLz4KPHBhdGggZD0iTTYuNjMwMDYgMTUuMjQ5N0M2LjM4NTAyIDE0LjU0MTkgNi4yNDMyMSAxMy43ODM1IDYuMjQzMjEgMTNDNi4yNDMyMSAxMi4yMTYzIDYuMzg1MDIgMTEuNDU4IDYuNjE3MTcgMTAuNzUwMkw2LjYxMDY3IDEwLjU5OTVMMi45ODI5IDcuODM4NDhMMi44NjQyMSA3Ljg5MzgxQzIuMDc3NTQgOS40MzU3NyAxLjYyNjE0IDExLjE2NzMgMS42MjYxNCAxM0MxLjYyNjE0IDE0LjgzMjYgMi4wNzc1NCAxNi41NjQxIDIuODY0MjEgMTguMTA2TDYuNjMwMDYgMTUuMjQ5N1oiIGZpbGw9IiNGQkJDMDUiLz4KPHBhdGggZD0iTTEzLjIzMjYgNi4wMjMzQzE1LjQxMjIgNi4wMjMzIDE2Ljg4MjQgNi45NDU5NCAxNy43MjA3IDcuNzE2OTZMMjAuOTk2NSA0LjU4MjVDMTguOTg0NiAyLjc0OTg3IDE2LjM2NjUgMS42MjUgMTMuMjMyNiAxLjYyNUM4LjY5MjkxIDEuNjI1IDQuNzcyMjUgNC4xNzgwNCAyLjg2MzU0IDcuODkzODRMNi42MTY1MSAxMC43NTAzQzcuNTU4MDYgOC4wMDc2MyAxMC4xNjMyIDYuMDIzMyAxMy4yMzI2IDYuMDIzM1oiIGZpbGw9IiNFQjQzMzUiLz4KPC9zdmc+Cg=="
                className="mr-21px"
              />
              <p className="text-blue font-normal">Sign in with Google</p>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

ModalLogin.propTypes = {
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isSubmissionSuccessful: PropTypes.bool,
};

ModalLogin.defaultProps = {
  modalIsOpen: false,
  onClose: () => {},
  isSubmissionSuccessful: false,
};

export default ModalLogin;
