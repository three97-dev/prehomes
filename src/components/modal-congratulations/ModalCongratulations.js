import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { useStaticQuery, graphql } from "gatsby";
import { useSelector } from "react-redux";

import Button from "../basic/button/Button";

import { submitForm } from "../../utils/submitForm";

import "./ModalCongratulations.css";

const ModalCongratulations = ({ modalIsOpen, onClose }) => {
  const session = useSelector(state => state.session);
  const { hubspotForm } = useStaticQuery(graphql`
    query ModalCongratulationsForm {
      hubspotForm(id: { eq: "91d12be3-d01e-45a8-8fb4-46a538d2c8d3" }) {
        guid
      }
    }
  `);

  async function onSubmitForm(emailOptIn = "no") {
    try {
      const payload = [
        {
          name: "email",
          value: session.email,
        },
        {
          name: "email_opt_in",
          value: emailOptIn,
        },
      ];
      console.log(payload);
      await submitForm(hubspotForm.guid, payload, Date.now(), true);
      onClose();
    } catch (e) {
      console.log(`Form is not submitted: ${e.message}`, e);
    }
  }

  if (modalIsOpen === false) {
    return null;
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={() => {
        onClose();
        onSubmitForm();
      }}
      className="modal-congratulations"
      overlayClassName="modal-congratulations-overlay"
    >
      <div className="modal-congratulations-container">
        <div className="modal-congratulations-content justify-items-center">
          <h2 className="text-tundora">Congratulations. Your List Awaits</h2>
          <div>
            <p className="text-black-gray mt-20px modal-form-text">
              We’re so happy to have you onboard.{" "}
              <span className="font-bold"> We’ve just added your first project to your personalized list.</span> You can
              access the list below, or through the menu button.
            </p>
            <p className="text-black-gray mt-24px modal-form-text">
              Last but not least, we’d like to offer you the opportunity to opt-in to email updates. We’re not careless
              about outbound emails, we just want to let you know whats important for you as it relates to your
              favourites, and upcoming projects you might be interested in.
            </p>
          </div>
          <div className="mt-45px flex w-full justify-between items-center">
            <button onClick={() => onSubmitForm()} className="cursor-pointer">
              <p className="underline">No, Thank You</p>
            </button>
            <Button
              onClick={() => {
                onSubmitForm("yes");
              }}
              variants="dark_orange"
              btnClasses="w-251px h-54px modal-congratulations-button"
            >
              <span className="button-font text-white">Yes, Please</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalCongratulations.propTypes = {
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isSubmissionSuccessful: PropTypes.bool,
};

ModalCongratulations.defaultProps = {
  modalIsOpen: false,
  onClose: () => {},
  isSubmissionSuccessful: false,
};

export default ModalCongratulations;
