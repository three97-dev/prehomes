import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Text from "../basic/text/Text";

import YoutubeVideoBackgroundWeb from "../../../assets/old_assets/pages/analytics/youtube-video-bg-web.svg";

import "./YoutubeVideo.css";

const YoutubeVideo = ({ title, content, videoLink, className, ...otherProps }) => {
  return (
    <div className={`grid justify-items-center overflow-hidden ${className}`} {...otherProps}>
      <div className="grid youtube-video-mobile-grid md:youtube-video-tablet-grid lg:youtube-video-desktop-grid xl:youtube-video-hd-grid relative justify-items-center lg:items-center mt-50px md:mt-100px lg:mt-120px xl:mt-130px mb-51px md:mb-100px lg:mb-120px xl:mb-130px">
        <img
          src={YoutubeVideoBackgroundWeb}
          alt="background"
          className="hidden lg:block absolute -z-10 top-280px xl:top-441px -left-160px xl:-left-152px xl:w-250px max-w-none"
        />
        <div className="grid youtube-video-content-area">
          <Text typography="h2" className="">
            {title}
          </Text>
          <Text typography="h3" className="mt-22px">
            {content}
          </Text>
        </div>
        <iframe
          className="youtube-video-video-area w-full h-179px md:h-378px lg:h-300px xl:h-456px mt-50px md:mt-75px lg:mt-0px"
          src={videoLink}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
    </div>
  );
};

YoutubeVideo.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  videoLink: PropTypes.string,
  content: PropTypes.string,
};

YoutubeVideo.defaultProps = {
  className: "",
  title: "Title",
  videoLink: "https://youtu.be/YKSNBIlM_bY",
  content: "Content",
};

export default YoutubeVideo;

// export const query = graphql`
//   fragment YoutubeVideo on ContentfulYoutubeVideo {
//     title
//     content
//     videoLink
//   }
// `;