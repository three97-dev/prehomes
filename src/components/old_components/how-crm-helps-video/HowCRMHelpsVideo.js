import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Text from "../basic/text/Text";

import ImageBackgroundTablet from "../../../assets/old_assets/pages/crm/how-crm-helps-video-bg-tablet.svg";
import ImageBackgroundWeb from "../../../assets/old_assets/pages/crm/how-crm-helps-video-bg-web.svg";
import ImageBackgroundWebHD from "../../../assets/old_assets/pages/crm/how-crm-helps-video-bg-webhd.svg";

import "./HowCRMHelpsVideo.css";

const HowCRMHelpsVideo = ({ title, subtitle, videoLink, mainText, secondaryText, className, ...otherProps }) => {
  return (
    <div className={`grid justify-items-center w-full overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative how-crm-helps-video-grid-mobile md:how-crm-helps-video-grid-tablet lg:how-crm-helps-video-grid-web xl:how-crm-helps-video-grid-webhd mx-36px md:mx-0px md:mt-52px lg:mt-0px md:pt-15px lg:pt-0px pb-50px md:pb-100px lg:pb-138px">
        <img
          src={ImageBackgroundTablet}
          alt="background"
          className="hidden md:block lg:hidden absolute -z-10 md:bottom-1012px md:-right-130px max-w-none"
        />
        <img
          src={ImageBackgroundWeb}
          alt="background"
          className="hidden lg:block xl:hidden absolute -z-10 lg:bottom-650px lg:-right-233px max-w-none"
        />
        <img
          src={ImageBackgroundWebHD}
          alt="background"
          className="hidden xl:block absolute -z-10 xl:bottom-602px xl:-right-350px max-w-none "
        />
        <div className="area-how-crm-helps-video-title">
          <Text typography="h2" className="text-center mt-50px md:mt-83px lg:mt-202px xl:mt-225px">
            {title}
          </Text>
          <Text text={subtitle} typography="body" className="mt-20px xl:mb-20px" />
        </div>
        <div className="area-how-crm-helps-video-text">
          <Text typography="h3" className="mt-22px md:mt-20px xl:mt-0px">
            {mainText}
          </Text>
          <Text text={secondaryText} className="mt-22px" />
        </div>
        <iframe
          className="youtube-video-area w-full lg:self-center h-179px md:h-378px lg:h-300px xl:h-378px mt-35px md:mt-60px lg:mt-0px"
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

HowCRMHelpsVideo.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.object,
  mainText: PropTypes.string,
  secondaryText: PropTypes.object,
  videoLink: PropTypes.string,
  className: PropTypes.string,
};

HowCRMHelpsVideo.defaultProps = {
  title: "Some Title",
  subtitle: "Some Subtitle",
  mainText: "Some Main text",
  secondaryText: "Some Secondary text",
  videoLink: "https://www.youtube.com/embed/YKSNBIlM_bY",
  className: "",
};

export default HowCRMHelpsVideo;

// export const query = graphql`
//   fragment HowCrmHelpsVideo on ContentfulHowCrmHelpsVideo {
//     title
//     subtitle {
//       childMarkdownRemark {
//         html
//       }
//     }
//     videoLink
//     mainText
//     secondaryText {
//       raw
//     }
//   }
// `;
