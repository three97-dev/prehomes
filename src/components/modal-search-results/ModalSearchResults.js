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
      <h1 className="text-center text-22px text-tundora leading-22px font-metropolis pb-15px">
        Top <span className="font-bold">{items.length}</span> results for “
        <span className="font-bold">{searchTerm}</span>”
      </h1>
      <hr className={`item-line mr-40px`} />
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
            <div className="modal-search-image">
              <img className="my-auto mx-auto" src={getIconByType(type)} alt="" />
            </div>
            <div className="text-wrapper">
              <div className={`text-title item-title text-18px text-tundora leading-16px font-metropolis mb-7px`}>
                {label}
              </div>
              <div className={`item-subtitle text-10px text-tundora font-metropolis font-bold`}>{type}</div>
            </div>
            <hr className="item-line" />
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default ModalSearchResults;
