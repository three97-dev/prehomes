import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { useStaticQuery, graphql } from "gatsby";

import "./ModalWindowForContactRealtorForm.css";

const ModalForm = ({ modalIsOpen, onClose, title, text }) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        onRequestClose={() => onClose()}
        className="modal-window-for-contact-realtor-form"
        overlayClassName="modal-window-for-contact-realtor-form-overlay"
      >
        <div className="modal-window-for-contact-realtor-form-container">
          <div className="modal-window-for-contact-realtor-form-content justify-items-center">
            <div className="text-29px leading-29px text-tundora font-bold font-metropolis">{title}</div>
            <div className="text-16px leading-24px text-dark-gray font-metropolis text-center mt-20px">{text}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

ModalForm.propTypes = {
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
};

ModalForm.defaultProps = {
  modalIsOpen: false,
  onClose: () => {},
  title: "We’ve just received your inquiry.",
  text: "A representative is reviewing the submission and will reach out to you shortly at the contact information provided.",
};

export default ModalForm;
