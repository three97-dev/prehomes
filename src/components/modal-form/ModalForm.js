import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import Button from "../basic/button/Button";

import "./ModalForm.css";

const ModalForm = ({ modalIsOpen, onClose, isSubmissionSuccessful }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={() => onClose()}
      className="modal-form"
      overlayClassName="modal-form-overlay"
    >
      <div className="modal-form-container">
        <div className="modal-form-content justify-items-center">
          <h2 className="text-black-gray">
            {isSubmissionSuccessful ? "We’ve just received your inquiry." : "Woops. There’s an issue."}
          </h2>
          <div className="text-black-gray text-center mt-20px modal-form-text">
            {isSubmissionSuccessful ? (
              "A representative is reviewing the submission and will reach out to you shortly at the contact information provided."
            ) : (
              <div className="text-black-gray">
                <p className="mb-16px md:mb-24px">
                  <b>There are three fields below. Please check that the following is correct and resubmit:</b>
                </p>
                <ul>
                  <li>
                    <p>You have an name entered in the “Name” field below</p>
                  </li>
                  <li>
                    <p>You have entered a correct email format (has @ symbol and a domain ie: .com,.ca, etc.)</p>
                  </li>
                  <li>
                    <p>Please select a viewing date that is past today’s date.</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {isSubmissionSuccessful ? (
            <Button
              variants="dark_orange"
              onClick={() => onClose(false)}
              btnClasses="bg-dark-orange text-white w-250px h-54px mt-70px"
            >
              <span className="button-font">Ok</span>
            </Button>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

ModalForm.propTypes = {
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isSubmissionSuccessful: PropTypes.bool,
};

ModalForm.defaultProps = {
  modalIsOpen: false,
  onClose: () => {},
  isSubmissionSuccessful: false,
};

export default ModalForm;
