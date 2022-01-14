import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { useStaticQuery, graphql } from "gatsby";

import Button from "../basic/button/Button";
import Markdown from "../basic/markdown/Markdown";

import "./ModalForm.css";

const ModalForm = ({ modalIsOpen, onClose, isSubmissionSuccessful }) => {
  const dataFromCMS = useStaticQuery(graphql`
    query ModalForm {
      contentfulModalWindowForContactSalesForm(contentful_id: { eq: "3IW2f4LUQhRYjEHgs05HbQ" }) {
        submittedTitle
        submittedText
        errorTitle
        errorText {
          raw
        }
        buttonLabel
      }
    }
  `);

  const { submittedTitle, submittedText, errorTitle, errorText, buttonLabel } =
    dataFromCMS.contentfulModalWindowForContactSalesForm;

  return (
    <>
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
            <h2 className="text-black-gray">{isSubmissionSuccessful ? submittedTitle : errorTitle}</h2>
            <div className="text-black-gray text-center mt-20px modal-form-text">
              {isSubmissionSuccessful ? (
                submittedText
              ) : (
                <Markdown
                  data={errorText}
                  config={{
                    p: "text-black-gray",
                  }}
                />
              )}
            </div>
            {isSubmissionSuccessful ? (
              <Button
                variants="dark_orange"
                onClick={() => onClose(false)}
                btnClasses="bg-dark-orange text-white w-250px h-54px mt-70px"
              >
                <span className="button-font">{buttonLabel}</span>
              </Button>
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  );
};

ModalForm.propTypes = {
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  submittedTitle: PropTypes.string,
  submittedText: PropTypes.string,
  errorTitle: PropTypes.string,
  errorText: PropTypes.any,
  buttonLabel: PropTypes.string,
  isSubmissionSuccessful: PropTypes.bool,
};

ModalForm.defaultProps = {
  modalIsOpen: false,
  onClose: () => {},
  onClick: () => {},
  submittedTitle: "",
  submittedText: "",
  errorTitle: "",
  errorText: "",
  buttonLabel: "Button",
  isSubmissionSuccessful: false,
};

export default ModalForm;
