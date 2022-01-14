import React, { useCallback } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";

import Image from "../basic/image/Image";
import Button from "../basic/button/Button";

import { SAVE_FLOOR_PLAN_TRIGGER } from "../../redux/actions/save-floor-plan";
import { DELETE_FLOOR_PLAN_TRIGGER } from "../../redux/actions/save-floor-plan";

import Favorite from "../../assets/tiles/favorite.svg";
import FavoriteRed from "../../assets/tiles/favorite-red.svg";

import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import "./ModalFloorPlan.css";

const ModalFloorPlan = ({
  modalIsOpen,
  onClose,
  floorPlan,
  projectContentfulId,
  projectName,
  projectNameLabel,
  suiteNameLabel,
  squareFootageLabel,
  sizeColumnUnits,
  bedroomsLabel,
  bathroomsLabel,
  modalProjectPrice,
  saveFloorPlanButtonLabel,
}) => {
  const { isLoggedIn } = useSelector(state => state.session);
  const isDesktop = useApplyAfterWidth(833);

  const dispatch = useDispatch();
  const saveFloorPlan = useSelector(state => state.saveFloorPlan);
  const session = useSelector(state => state.session);
  const isFavorite = saveFloorPlan.savedFloorPlans.some(floorPlanId => floorPlanId === floorPlan?.contentful_id);

  const saveUnsaveFloorPlanButton = useCallback(() => {
    if (isFavorite) {
      dispatch({
        type: DELETE_FLOOR_PLAN_TRIGGER,
        email: session.email,
        floorPlanId: floorPlan?.contentful_id,
        projectId: projectContentfulId,
      });
    } else {
      dispatch({
        type: SAVE_FLOOR_PLAN_TRIGGER,
        email: session.email,
        floorPlanId: floorPlan?.contentful_id,
        projectId: projectContentfulId,
      });
    }
  }, [floorPlan, isFavorite, session, dispatch]);

  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={() => onClose()}
      className="modal-floor-plan"
      overlayClassName="modal-floor-plan-overlay"
    >
      <button onClick={() => onClose()} className="close-button" />
      <div className="modal-flor-plan-grid">
        <div className="modal-flor-plan-image-area w-200px md:w-490px h-200px md:h-490px mx-auto md:my-15px md:ml-15px">
          <Image image={floorPlan?.floorPlanImage} />
        </div>
        {isDesktop ? (
          <div className="modal-flor-plan-descriptions-area pt-30px md+:pt-45px">
            <span className="eyebrow-font text-black">{projectNameLabel.toUpperCase()}</span>
            <p className="text-black mb-25px">{projectName.toUpperCase()}</p>
            <span className="eyebrow-font text-black">{suiteNameLabel.toUpperCase()}</span>
            <p className="text-black mb-25px">{floorPlan?.name?.toUpperCase()}</p>
            <div className="apartment-parameters-grid-area">
              <span className="grid-square-footage-title-area eyebrow-font text-black justify-self-center">
                {squareFootageLabel.toUpperCase()}
              </span>
              <p className="grid-square-footage-value-area text-black justify-self-center">
                {floorPlan?.squareFootage?.toLocaleString("en-US")}
              </p>
              <span className="grid-bedrooms-title-area eyebrow-font text-black justify-self-center">
                {bedroomsLabel.toUpperCase()}
              </span>
              <p className="grid-bedrooms-value-area text-black justify-self-center">
                {floorPlan?.bedrooms?.toLocaleString()}
              </p>
              <span className="grid-bathrooms-title-area eyebrow-font text-black justify-self-center">
                {bathroomsLabel.toUpperCase()}
              </span>
              <p className="grid-bathrooms-value-area text-black justify-self-center">
                {floorPlan?.bathrooms?.toLocaleString()}
              </p>
            </div>
            <div className="eyebrow-font text-black">{modalProjectPrice.toUpperCase()}</div>
            <h3 className="mb-25px">${floorPlan?.price?.toLocaleString("en-US")}</h3>

            <div className="flex items-center -ml-7px">
              {isLoggedIn ? (
                <Button
                  onClick={saveUnsaveFloorPlanButton}
                  btnClasses="flex items-center justify-center w-174px h-54px mr-20px button-font text-white"
                  variants="black_gradient"
                >
                  <img className="w-23px h-20px mr-10px" src={isFavorite ? FavoriteRed : Favorite} alt="favourite" />
                  {saveFloorPlanButtonLabel}
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className={`modal-flor-plan-descriptions-area px-15px`}>
            <span className="eyebrow-font text-black">{modalProjectPrice.toUpperCase()}</span>
            <h3 className="mb-25px">${floorPlan?.price?.toLocaleString("en-US")}</h3>
            <span className="eyebrow-font text-black">{suiteNameLabel.toUpperCase()}</span>
            <p className="mb-25px text-black">{floorPlan?.name?.toUpperCase()}</p>
            <div className="apartment-parameters-grid-area">
              <span className="grid-square-footage-title-area eyebrow-font text-black justify-self-start">
                {sizeColumnUnits.toUpperCase()}
              </span>
              <p className="grid-square-footage-value-area text-black justify-self-start">
                {floorPlan?.squareFootage?.toLocaleString("en-US")}
              </p>
              <span className="grid-bedrooms-title-area eyebrow-font text-black justify-self-start">
                {bedroomsLabel.toUpperCase()}
              </span>
              <p className="grid-bedrooms-value-area text-black justify-self-start">
                {floorPlan?.bedrooms?.toLocaleString()}
              </p>
              <span className="grid-bathrooms-title-area eyebrow-font text-black justify-self-start">
                {bathroomsLabel.toUpperCase()}
              </span>
              <p className="grid-bathrooms-value-area text-black justify-self-start">
                {floorPlan?.bathrooms?.toLocaleString()}
              </p>
            </div>

            {isLoggedIn ? (
              <div className="buttons-grid">
                <Button
                  onClick={saveUnsaveFloorPlanButton}
                  btnClasses="flex items-center justify-center w-160px h-50px button-font text-white"
                  variants="black_gradient"
                >
                  <img className="w-23px h-20px mr-10px" src={isFavorite ? FavoriteRed : Favorite} alt="favourite" />
                  {saveFloorPlanButtonLabel}
                </Button>
                <Button
                  btnClasses="flex items-center justify-center w-160px h-50px button-font text-white"
                  variants="dark_orange"
                >
                  Request Info
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalFloorPlan;
