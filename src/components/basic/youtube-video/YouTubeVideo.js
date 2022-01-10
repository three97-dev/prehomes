import React from "react";
import PropTypes from "prop-types";

const YouTubeVideo = ({ media, className }) => {
  return (
    <iframe
      className={className}
      src={media}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="video"
    />
  );
};

YouTubeVideo.propTypes = {
  media: PropTypes.string,
  className: PropTypes.string,
};
YouTubeVideo.defaultProps = {
  media: "https://www.youtube.com/embed/8W98yOUDofw",
  className: "",
};
export default YouTubeVideo;
