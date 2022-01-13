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
  console.log(isFavorite);

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
            <div className="modal-floor-plan-titles">{projectNameLabel.toUpperCase()}</div>
            <div className="modal-floor-plan-values">{projectName.toUpperCase()}</div>
            <div className="modal-floor-plan-titles">{suiteNameLabel.toUpperCase()}</div>
            <div className="modal-floor-plan-values">{floorPlan?.name?.toUpperCase()}</div>
            <div className="apartment-parameters-grid-area">
              <div className="grid-square-footage-title-area modal-floor-plan-titles justify-self-center">
                {squareFootageLabel.toUpperCase()}
              </div>
              <div className="grid-square-footage-value-area modal-floor-plan-values justify-self-center">
                {floorPlan?.squareFootage?.toLocaleString("en-US")}
              </div>
              <div className="grid-bedrooms-title-area modal-floor-plan-titles justify-self-center">
                {bedroomsLabel.toUpperCase()}
              </div>
              <div className="grid-bedrooms-value-area modal-floor-plan-values justify-self-center">
                {floorPlan?.bedrooms?.toLocaleString()}
              </div>
              <div className="grid-bathrooms-title-area modal-floor-plan-titles justify-self-center">
                {bathroomsLabel.toUpperCase()}
              </div>
              <div className="grid-bathrooms-value-area modal-floor-plan-values justify-self-center">
                {floorPlan?.bathrooms?.toLocaleString()}
              </div>
            </div>
            <div className="modal-floor-plan-titles">{modalProjectPrice.toUpperCase()}</div>
            <div className="modal-floor-plan-price">${floorPlan?.price?.toLocaleString("en-US")}</div>

            <div className="flex items-center -ml-7px">
              {isLoggedIn ? (
                <Button
                  onClick={saveUnsaveFloorPlanButton}
                  btnClasses="flex items-center justify-center w-174px h-54px mr-20px text-14px leading-17px font-bold font-rosario text-white"
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
            <div className="modal-floor-plan-titles">{modalProjectPrice.toUpperCase()}</div>
            <div className="modal-floor-plan-price">${floorPlan?.price?.toLocaleString("en-US")}</div>
            <div className="modal-floor-plan-titles">{suiteNameLabel.toUpperCase()}</div>
            <div className="modal-floor-plan-values">{floorPlan?.name?.toUpperCase()}</div>
            <div className="apartment-parameters-grid-area">
              <div className="grid-square-footage-title-area modal-floor-plan-titles justify-self-start">
                {sizeColumnUnits.toUpperCase()}
              </div>
              <div className="grid-square-footage-value-area modal-floor-plan-values justify-self-start">
                {floorPlan?.squareFootage?.toLocaleString("en-US")}
              </div>
              <div className="grid-bedrooms-title-area modal-floor-plan-titles justify-self-start">
                {bedroomsLabel.toUpperCase()}
              </div>
              <div className="grid-bedrooms-value-area modal-floor-plan-values justify-self-start">
                {floorPlan?.bedrooms?.toLocaleString()}
              </div>
              <div className="grid-bathrooms-title-area modal-floor-plan-titles justify-self-start">
                {bathroomsLabel.toUpperCase()}
              </div>
              <div className="grid-bathrooms-value-area modal-floor-plan-values justify-self-start">
                {floorPlan?.bathrooms?.toLocaleString()}
              </div>
            </div>

            {isLoggedIn ? (
              <div className="buttons-grid">
                <Button
                  onClick={saveUnsaveFloorPlanButton}
                  btnClasses="flex items-center justify-center w-160px h-50px text-14px leading-14px font-bold font-metropolis text-white"
                  variants="black_gradient"
                >
                  <img className="w-23px h-20px mr-10px" src={isFavorite ? FavoriteRed : Favorite} alt="favourite" />
                  {saveFloorPlanButtonLabel}
                </Button>
                <Button
                  btnClasses="flex items-center justify-center w-160px h-50px text-14px leading-14px font-bold text-white"
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
