import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import "./GettingMost.css";
import Text from "../basic/text/Text";
import Border from "../basic/border/Border";
import Image from "../basic/image/Image";

import ImageBgMobile from "../../../assets/old_assets/pages/analytics/getting-most-bg-mobile.svg";
import ImageBgTablet from "../../../assets/old_assets/pages/analytics/getting-most-bg-tablet-plus.svg";

const GettingMost = ({
  title,
  subtitle,
  blockImage1,
  blockTitle1,
  blockContent1,
  blockImage2,
  blockTitle2,
  blockContent2,
  blockImage3,
  blockTitle3,
  blockContent3,
  className,
  ...otherProps
}) => {
  return (
    <div className={`grid justify-items-center w-full overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative getting-grid-mobile md:getting-grid-tablet lg:getting-grid-web xl:getting-grid-webHD mb-40px md:mb-90px lg:mb-115px xl:mb-0px xl:mt-150px">
        <img
          src={ImageBgMobile}
          alt="background"
          className="block md:hidden absolute -z-10 -bottom-30px -right-115px max-w-none w-620px"
        />
        <img
          src={ImageBgTablet}
          alt="background"
          className="hidden md:block absolute -z-10 md:-right-495px md:-bottom-70px lg:-right-190px lg:-bottom-70px xl:-right-252px xl:bottom-0px max-w-none md:w-1640px lg:w-1453px xl:w-2061px"
        />

        <div className="getting-title-area px-32px md:px-0px lg:px-0px pr-50px md:pr-0px lg:pr-552px xl:pr-834px">
          <Text typography="h2" className="mb-22px lg:mb-20px xl:mb-22px">
            {title}
          </Text>
          <Text typography="h3" className="mb-53px md:mb-48px lg:mb-55px xl:mb-78px">
            {subtitle}
          </Text>
        </div>

        <div className="getting-answer-area1 text-center pb-30px md:pb-50px px-56px md:px-0px lg:px-0px md:pl-20px lg:pl-15px md:mr-28px lg:mr-23px xl:mr-22px">
          <Image image={blockImage1} width="165" height="165" className="mb-20px inline-block" />
          <Text typography="h4" className="mb-20px lg:mb-21px">
            {blockTitle1}
          </Text>
          <Text typography="body" className="xl:px-10px ">
            {blockContent1}
          </Text>
        </div>
        <Border
          borderSide="bottom"
          className="getting-answer-area1 lg:hidden justify-self-center max-w-154px md:max-w-none"
        />
        <Border
          borderSide="right"
          className="getting-answer-area1 hidden md:block justify-self-end md:max-h-310px lg:max-h-260px lg:bottom-75px xl:bottom-90px"
        />

        <div className="getting-answer-area2 text-center px-56px md:px-0px lg:px-28px md:pl-28px md:pr-20px pb-32px md:pb-50px pt-30px md:pt-0px lg:pt-0px">
          <Image image={blockImage2} width="165" height="165" className="mb-20px inline-block" />
          <Text typography="h4" className=" mb-20px">
            {blockTitle2}
          </Text>
          <Text typography="body">{blockContent2}</Text>
        </div>
        <Border
          borderSide="right"
          className="getting-answer-area2 lg:block justify-self-end hidden lg:max-h-260px lg:bottom-75px xl:bottom-90px"
        />

        <Border
          borderSide="bottom"
          className="answer-block-area2 lg:hidden justify-self-center max-w-154px md:max-w-none"
        />
        <Border
          borderSide="top"
          className="getting-answer-area2 md:hidden justify-self-center max-w-154px md:max-w-156px"
        />
        <Border
          borderSide="left"
          className="answer-block-area2 hidden md:block md:max-h-310px lg:max-h-260px lg:bottom-75px xl:bottom-90px"
        />

        <div className="getting-answer-area3 text-center px-56px md:px-190px lg:px-0px pt-30px md:pt-53px lg:pt-0px lg:pl-22px xl:pl-18px lg:pr-10px">
          <Image image={blockImage3} width="165" height="165" className="mb-20px inline-block" />
          <Text typography="h4" className="mb-20px lg:mb-22px">
            {blockTitle3}
          </Text>
          <Text typography="body" className="lg:ml-10px xl:ml-0px">
            {blockContent3}
          </Text>
        </div>
        <Border
          borderSide="top"
          className="getting-answer-area3 lg:hidden justify-self-center max-w-154px md:max-w-672px"
        />
        <Border borderSide="left" className="getting-answer-area3 hidden lg:block lg:max-h-260px lg:bottom-75px xl:bottom-90px" />
      </div>
    </div>
  );
};

GettingMost.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  blockImage1: PropTypes.object,
  blockTitle1: PropTypes.string,
  blockContent1: PropTypes.string,
  blockImage2: PropTypes.object,
  blockTitle2: PropTypes.string,
  blockContent2: PropTypes.string,
  blockImage3: PropTypes.object,
  blockTitle3: PropTypes.string,
  blockContent3: PropTypes.string,
  className: PropTypes.string,
};

GettingMost.defaultProps = {
  title: "some title",
  subtitle: "some sublitle",
  blockTitle1: "some blockTitle1",
  blockContent1: "some blockContent1",
  blockTitle2: "some blockTitle2",
  blockContent2: "some blockContent2",
  blockTitle3: "some blockTitle3",
  blockContent3: "some blockContent3",
  className: "",
};

export default GettingMost;

// export const query = graphql`
//   fragment GettingMost on ContentfulGettingMost {
//     title
//     subtitle
//     block1Image {
//       ...Image
//     }
//     block1Title
//     block1Content
//     block2Image {
//       ...Image
//     }
//     block2Title
//     block2Content
//     block3Image {
//       ...Image
//     }
//     block3Title
//     block3Content
//   }
// `;
