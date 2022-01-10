import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Image from "../basic/image/Image";
import Text from "../basic/text/Text";

import ImageMicrosoftPartnerBgTablet from "../../../assets/old_assets/pages/home/microsoft-partner-bg-tablet.svg";
import ImageMicrosoftPartnerBgWeb from "../../../assets/old_assets/pages/home/microsoft-partner-bg-web.svg";
import ImageMicrosoftPartnerBgWebHd from "../../../assets/old_assets/pages/home/microsoft-partner-bg-webhd.svg";

import "./MicrosoftPartner.css";

const MicrosoftPartner = ({ title, mainText, secondaryText, image, className, ...otherProps }) => {
  return (
    <div
      className={`grid justify-items-center w-full overflow-x-hidden md+:h-985px lg+:h-1205px ${className}`}
      {...otherProps}
    >
      <div className="grid relative mp-grid-mobile md+:mp-grid-web h-max max-w-672px md+:max-w-1246px lg:max-w-1550px">
        <img
          src={ImageMicrosoftPartnerBgTablet}
          alt="background"
          className="hidden md:block md+:hidden absolute -z-10 bottom-8px right-66px"
        />
        <img
          src={ImageMicrosoftPartnerBgWeb}
          alt="background"
          className="hidden md+:block lg+:hidden absolute -z-10 top-33px -right-252px"
        />
        <img
          src={ImageMicrosoftPartnerBgWebHd}
          alt="background"
          className="hidden lg+:block absolute -z-10 top-155px -right-405px"
        />

        <Text
          typography="h2"
          className="area-mp-title mx-36px md:mx-0px mt-50px md:mt-100px md+:mt-120px lg+:mt-150px md+:mb-50px md+:text-center"
        >
          {title}
        </Text>
        <Text
          typography="h3"
          text={mainText}
          className="area-mp-main-text mx-36px md:mx-0px mt-22px md+:mt-215px lg+:mt-310px md+:pl-7px lg+:pl-9px md+:max-w-535px lg+:max-w-680px"
        />
        <Text
          typography="body"
          text={secondaryText}
          className="area-mp-secondary-text mx-33px md:mx-0px mt-22px pl-3px md:pl-1px md+:pl-8px lg+:pl-10px md+:max-w-535px lg+:max-w-680px"
        />
        <Image
          image={image}
          width="374"
          height="400"
          className="area-mp-partner-image mt-50px md:mt-75px md+:mt-0px lg+:mt-25px md:mb-20px -ml-55px md:-ml-88px md+:ml-0px md+:mr-101px lg+:mr-148px justify-self-center w-374px md:w-587px md+:w-523px lg+:w-629px"
        />
      </div>
    </div>
  );
};

MicrosoftPartner.propTypes = {
  title: PropTypes.string,
  mainText: PropTypes.object,
  secondaryText: PropTypes.object,
  image: PropTypes.object,
  className: PropTypes.string,
};

MicrosoftPartner.defaultProps = {
  title: "Some title",
  mainText: "Some mainText",
  secondaryText: "Some secondaryText",
  className: "",
};

export default MicrosoftPartner;

// export const query = graphql`
//   fragment MicrosoftPartner on ContentfulMicrosoftPartner {
//     title
//     mainText {
//       childMarkdownRemark {
//         html
//       }
//     }
//     secondaryText {
//       childMarkdownRemark {
//         html
//       }
//     }
//     image {
//       ...Image
//     }
//   }
// `;
