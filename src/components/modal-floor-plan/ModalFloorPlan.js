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

const ModalFloorPlan = ({ modalIsOpen, onClose, floorPlan, projectStrapiId, projectName }) => {
  const { isLoggedIn } = useSelector(state => state.session);
  const isDesktop = useApplyAfterWidth(833);

  const dispatch = useDispatch();
  const saveFloorPlan = useSelector(state => state.saveFloorPlan);
  const session = useSelector(state => state.session);
  const isFavorite = saveFloorPlan.savedFloorPlans.some(floorPlanId => floorPlanId === floorPlan?.id);

  const saveUnsaveFloorPlanButton = useCallback(() => {
    if (isFavorite) {
      dispatch({
        type: DELETE_FLOOR_PLAN_TRIGGER,
        email: session.email,
        floorPlanId: floorPlan?.id,
        projectId: projectStrapiId,
      });
    } else {
      dispatch({
        type: SAVE_FLOOR_PLAN_TRIGGER,
        email: session.email,
        floorPlanId: floorPlan?.id,
        projectId: projectStrapiId,
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
        <div className="modal-flor-plan-image-area w-200px md:w-full h-200px md:h-full mx-auto md:py-15px md:pl-15px">
          <Image image={floorPlan?.floorPlanImage} className="w-full h-full" imgStyle={{ objectFit: `contain` }} />
        </div>
        {isDesktop ? (
          <div className="modal-flor-plan-descriptions-area py-30px md+:py-70px">
            <span className="eyebrow-font text-black">PROJECT NAME</span>
            <p className="text-black mt-18px mb-31px">{projectName.toUpperCase()}</p>
            <span className="eyebrow-font text-black">SUITE NAME</span>
            <p className="text-black mt-18px mb-31px">{floorPlan?.floorPlanName?.toUpperCase()}</p>
            <span className="eyebrow-font text-black">SQUARE FOOTAGE</span>
            <p className="text-black mt-18px mb-31px">
              {floorPlan?.squareFootage ? floorPlan?.squareFootage?.toLocaleString("en-US") : ""}
            </p>
            <div className="apartment-parameters-grid-area mb-32px">
              <span className="grid-bedrooms-title-area eyebrow-font text-black mb-18px">BEDROOMS</span>
              <p className="grid-bedrooms-value-area text-black">
                {floorPlan?.bedrooms ? floorPlan?.bedrooms?.toLocaleString() : ""}
              </p>
              <span className="grid-bathrooms-title-area eyebrow-font text-black mb-18px">BATHROOMS</span>
              <p className="grid-bathrooms-value-area text-black">
                {floorPlan?.bathrooms ? floorPlan?.bathrooms?.toLocaleString() : ""}
              </p>
            </div>
            <div className="eyebrow-font text-black mb-23px">PRICE</div>
            <h3 className="mb-50px">
              {floorPlan?.price ? `\$${floorPlan?.price?.toLocaleString("en-US")}` : "Please contact"}
            </h3>

            <div className="flex items-center -ml-7px">
              {isLoggedIn ? (
                <Button
                  onClick={saveUnsaveFloorPlanButton}
                  btnClasses="flex items-center justify-center w-174px h-54px mr-20px button-font text-white"
                  variants="black_gradient"
                >
                  <img className="w-23px h-20px mr-10px" src={isFavorite ? FavoriteRed : Favorite} alt="favourite" />
                  Save Floor Plan
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className={`modal-flor-plan-descriptions-area px-15px`}>
            <span className="eyebrow-font text-black">PRICE</span>
            <h3 className="mb-25px">
              {floorPlan?.price ? `\$${floorPlan?.price?.toLocaleString("en-US")}` : "Please contact"}
            </h3>
            <span className="eyebrow-font text-black">SUITE NAME</span>
            <p className="mb-25px text-black">{floorPlan?.name?.toUpperCase()}</p>
            <div className="apartment-parameters-grid-area">
              <span className="grid-square-footage-title-area eyebrow-font text-black justify-self-start">SQ.FT</span>
              <p className="grid-square-footage-value-area text-black justify-self-start">
                {floorPlan?.squareFootage ? floorPlan?.squareFootage?.toLocaleString("en-US") : ""}
              </p>
              <span className="grid-bedrooms-title-area eyebrow-font text-black justify-self-start">BEDROOMS</span>
              <p className="grid-bedrooms-value-area text-black justify-self-start">
                {floorPlan?.bedrooms ? floorPlan?.bedrooms?.toLocaleString() : ""}
              </p>
              <span className="grid-bathrooms-title-area eyebrow-font text-black justify-self-start">BATHROOMS</span>
              <p className="grid-bathrooms-value-area text-black justify-self-start">
                {floorPlan?.bathrooms ? floorPlan?.bathrooms?.toLocaleString() : ""}
              </p>
            </div>

            {isLoggedIn ? (
              <Button
                onClick={saveUnsaveFloorPlanButton}
                btnClasses="flex items-center justify-center w-160px h-50px mx-auto mt-57px md:mt-0px mb-28px md:mb-0px button-font text-white"
                variants="black_gradient"
              >
                <img className="w-23px h-20px mr-10px" src={isFavorite ? FavoriteRed : Favorite} alt="favourite" />
                Save Floor Plan
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalFloorPlan;
