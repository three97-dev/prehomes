import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Text from "../basic/text/Text";
import Border from "../basic/border/Border";

import ImageBackgroundWebAndWebHd from "../../../assets/old_assets/pages/about/why-amplify-bg-web-webhd.svg";
import ImageBackgroundTablet from "../../../assets/old_assets/pages/about/why-amplify-bg-tablet.svg";

import "./WhyAmplify.css";

const WhyAmplify = ({
  title,
  subtitle,
  blockTitle1,
  blockContent1,
  blockTitle2,
  blockContent2,
  blockTitle3,
  blockContent3,
  className,
  ...otherProps
}) => {
  return (
    <div className={`grid justify-items-center w-full overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative signup-grid-mobile md:signup-grid-tablet lg:signup-grid-web xl:signup-grid-HD md:mb-45px lg:mb-185px xl:mb-312px">
        <img
          src={ImageBackgroundWebAndWebHd}
          alt="background"
          className="hidden lg:block absolute -z-10 lg:-bottom-185px lg:right-10px xl:-bottom-310px xl:right-247px max-w-none lg:w-370px xl:w-590px"
        />
        <img
          src={ImageBackgroundTablet}
          alt="background"
          className="hidden md:block lg:hidden absolute -z-10 md:-bottom-40px md:-right-160px max-w-none"
        />
        <div className="title-block-area text-center px-36px md:px-0px lg:px-140px">
          <Text typography="h2" className="mb-22px">
            {title}
          </Text>
          <Text typography="h3" className="mb-34px md:mb-54px lg:mb-80px lg:mx-50px">
            {subtitle}
          </Text>
        </div>

        <div className="answer-block-area1 text-center px-56px md:px-194px lg:px-0px pb-30px lg:mr-22px lg:ml-8px xl:mr-22px">
          <Text typography="h4" className=" mb-20px">
            {blockTitle1}
          </Text>
          <Text typography="body" className="xl:px-2px">
            {blockContent1}
          </Text>
        </div>
        <Border
          borderSide="bottom"
          className="answer-block-area1 lg:hidden justify-self-center max-w-154px md:max-w-156px"
        />
        <Border borderSide="right" className="answer-block-area1 justify-self-end hidden lg:block lg:max-h-130px" />

        <div className="answer-block-area2 text-center px-56px md:px-194px pb-32px pt-30px lg:pt-0px lg:px-28px">
          <Text typography="h4" className=" mb-20px xl:mb-44px">
            {blockTitle2}
          </Text>
          <Text typography="body">{blockContent2}</Text>
        </div>
        <Border borderSide="right" className="answer-block-area2 justify-self-end hidden lg:block lg:max-h-130px" />
        <Border
          borderSide="bottom"
          className="answer-block-area2 lg:hidden justify-self-center max-w-154px md:max-w-156px"
        />
        <Border
          borderSide="top"
          className="answer-block-area2 lg:hidden justify-self-center max-w-154px md:max-w-156px"
        />
        <Border borderSide="left" className="answer-block-area2 hidden lg:block lg:max-h-130px" />

        <div className="answer-block-area3 text-center px-56px md:px-194px lg:px-0px pt-30px lg:pt-0px lg:ml-24px lg:mr-10px">
          <Text typography="h4" className="mb-20px xl:mb-44px">
            {blockTitle3}
          </Text>
          <Text typography="body">{blockContent3}</Text>
        </div>
        <Border
          borderSide="top"
          className="answer-block-area3 lg:hidden justify-self-center max-w-154px md:max-w-156px"
        />
        <Border borderSide="left" className="answer-block-area3 hidden lg:block lg:max-h-130px" />
      </div>
    </div>
  );
};

WhyAmplify.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  blockTitle1: PropTypes.string,
  blockContent1: PropTypes.string,
  blockTitle2: PropTypes.string,
  blockContent2: PropTypes.string,
  blockTitle3: PropTypes.string,
  blockContent3: PropTypes.string,
  className: PropTypes.string,
};

WhyAmplify.defaultProps = {
  title: "",
  subtitle: "",
  blockTitle1: "",
  blockContent1: "",
  blockTitle2: "",
  blockContent2: "",
  blockTitle3: "",
  blockContent3: "",
  className: "",
};

export default WhyAmplify;

// export const query = graphql`
//   fragment WhyAmplify on ContentfulWhyAmplify {
//     title
//     subtitle
//     block1Title
//     block1Content
//     block2Title
//     block2Content
//     block3Title
//     block3Content
//   }
// `;
