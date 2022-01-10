import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Image from "../basic/image/Image";
import Text from "../basic/text/Text";

import ImageBackgroundTablet from "../../../assets/old_assets/pages/crm/how-crm-helps-bg-tablet.svg";
import ImageBackgroundWeb from "../../../assets/old_assets/pages/crm/how-crm-helps-bg-web.svg";
import ImageBackgroundWebHD from "../../../assets/old_assets/pages/crm/how-crm-helps-bg-webhd.svg";

import "./HowCRMHelps.css";

const HowCRMHelps = ({ title, subtitle, image, mainText, secondaryText, className, ...otherProps }) => {
  return (
    <div className={`grid justify-items-center w-full overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative how-crm-helps-grid-mobile md:how-crm-helps-grid-tablet lg:how-crm-helps-grid-web xl:how-crm-helps-grid-webhd mx-36px md:mx-0px md:mt-50px lg:mt-0px md:pt-15px lg:pt-0px pb-50px md:pb-100px lg:pb-138px">
        <img
          src={ImageBackgroundTablet}
          alt="background"
          className="hidden md:block lg:hidden absolute -z-10 md:bottom-632px md:-right-130px max-w-none"
        />
        <img
          src={ImageBackgroundWeb}
          alt="background"
          className="hidden lg:block xl:hidden absolute -z-10 lg:bottom-538px lg:-right-221px max-w-none"
        />
        <img
          src={ImageBackgroundWebHD}
          alt="background"
          className="hidden xl:block absolute -z-10 xl:bottom-500px xl:-right-495px max-w-none "
        />
        <div className="area-how-crm-helps-title">
          <Text typography="h2" className="text-center mt-50px md:mt-83px lg:mt-202px xl:mt-225px">
            {title}
          </Text>
          <Text
            text={subtitle}
            typography="body"
            className="mt-20px lg:ml-92px xl:ml-0px lg:max-w-904px xl:max-w-none"
          />
        </div>
        <div className="area-how-crm-helps-image mt-19px md:mt-50px lg:ml-92px xl:ml-0px">
          <Image image={image} className="md:w-242px lg:w-444px xl:w-536px" />
        </div>

        <div className="area-how-crm-helps-text">
          <Text typography="h3" className="mt-22px md:mt-50px">
            {mainText}
          </Text>
          <Text text={secondaryText} typography="body" className="mt-22px" />
        </div>
      </div>
    </div>
  );
};

HowCRMHelps.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.object,
  mainText: PropTypes.string,
  secondaryText: PropTypes.object,
  image: PropTypes.object,
  className: PropTypes.string,
};

HowCRMHelps.defaultProps = {
  title: "Some Title",
  subtitle: "Some Subtitle",
  mainText: "Some Main text",
  secondaryText: "Some Secondary text",
  className: "",
};

export default HowCRMHelps;

// export const query = graphql`
//   fragment HowCrmHelps on ContentfulHowCrmHelps {
//     title
//     subtitle {
//       childMarkdownRemark {
//         html
//       }
//     }
//     image {
//       ...Image
//     }
//     mainText
//     secondaryText {
//       raw
//     }
//   }
// `;
