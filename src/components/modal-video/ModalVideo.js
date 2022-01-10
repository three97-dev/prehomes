import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import "./ModalVideo.css";

const ModalVideo = ({ modalIsOpen, setIsOpen, modalVideoLink, reduceHeight }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
      className={reduceHeight ? "reduce-height-modal-video" : "modal-video"}
      overlayClassName="modal-video-overlay"
    >
      <button onClick={() => setIsOpen(false)} className="close-button" />
      <div className="modal-video-container">
        <iframe
          src={modalVideoLink}
          className={reduceHeight ? "reduce-height-modal-video-iframe" : "modal-video-iframe"}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
    </Modal>
  );
};

ModalVideo.propTypes = {
  reduceHeight: PropTypes.bool,
};
ModalVideo.defaultProps = {
  reduceHeight: true,
};

export default ModalVideo;
