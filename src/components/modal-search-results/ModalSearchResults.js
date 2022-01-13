import React from "react";
import Modal from "react-modal";
import { navigate } from "@reach/router";

import "./ModalSearchResults.css";

const ModalSearchResults = ({ getIconByType, items, modalIsOpen, onForceLocationChange, onClose, searchTerm }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      className="modal-search-results"
      overlayClassName="modal-search-results-overlay"
    >
      <button onClick={onClose} className="close-button" />
      <h1 className="text-center text-20px leading-30px font-medium font-poppins text-tundora pb-30px">
        Top {items.length} results for “<span className="font-bold">{searchTerm}</span>”
      </h1>
      <ul className="modal-search-results-dropdown">
        {items.map(({ label, type, link, lat, lng }, index) => (
          <li
            key={index}
            className="modal-search-results-item"
            onMouseDown={() => {
              if (onForceLocationChange && type === "place") {
                onForceLocationChange({ lat, lng });
              }
              navigate(link);
              onClose();
            }}
          >
            <hr className="item-line" />
            <div className="modal-search-image">
              <img className="my-auto mx-auto" src={getIconByType(type)} alt="" />
            </div>
            <div className="text-wrapper">
              <div
                className={`text-title item-title text-14px md:text-16px text-black leading-20px md:leading-24px font-poppins font-bold`}
              >
                {label.toUpperCase()}
              </div>
              <div
                className={`item-subtitle text-14px md:text-16px leading-20px md:leading-24px text-black font-poppins`}
              >
                {type.toUpperCase()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default ModalSearchResults;
