import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Text from "../basic/text/Text";
import Border from "../basic/border/Border";
import Image from "../basic/image/Image";

import AnalyticsFeaturesTablet from "../../../assets/old_assets/pages/analytics/analytics-features-bg-tablet.svg";
import AnalyticsFeaturesWeb from "../../../assets/old_assets/pages/analytics/analytics-features-bg-web.svg";
import AnalyticsFeaturesWebHD from "../../../assets/old_assets/pages/analytics/analytics-features-bg-webhd.svg";

import "./AnalyticsFeatures.css";

const AnalyticsFeatures = ({
  image,
  title,
  subtitle,
  feature1Title,
  feature1Content,
  feature2Title,
  feature2Content,
  feature3Title,
  feature3Content,
  feature4Title,
  feature4Content,
  feature5Title,
  feature5Content,
  feature6Title,
  feature6Content,
  className,
  ...otherProps
}) => {
  return (
    <div className={`grid justify-items-center overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative justify-items-center mx-36px md:mx-81px lg:mx-139px xl:mx-140px mt-50px md:mt-202px lg:mt-200px xl:mt-233px mb-50px md:mb-70px lg:mb-80px xl:mb-110px">
        <img
          src={AnalyticsFeaturesTablet}
          alt="background"
          className="hidden md:block lg:hidden absolute -z-10 -top-202px -left-215px max-w-none"
        />
        <img
          src={AnalyticsFeaturesWeb}
          alt="background"
          className="hidden lg:block xl:hidden absolute -z-10 -top-200px -left-190px max-w-none"
        />
        <img
          src={AnalyticsFeaturesWebHD}
          alt="background"
          className="hidden xl:block absolute -z-10 -top-75px -left-187px max-w-none"
        />
        <div className="grid lg:analytics-features-image-text-desktop-grid xl:analytics-features-image-text-hd-grid">
          <Text
            typography="h2"
            className="text-center lg:text-left md:px-86px lg:px-0px lg:mt-111px xl:mt-197px lg:analytics-features-text-area"
          >
            {title}
          </Text>
          <Image
            image={image}
            width="812"
            height="509"
            className="justify-self-center w-full md:max-w-812px lg:max-w-none mt-50px md:mt-75px lg:mt-0px lg:analytics-features-image-area"
          />
        </div>

        <Text typography="h3" className="text-center mt-50px md:mt-75px mb-24px md:mb-26px lg:mb-33px xl:mb-30px">
          {subtitle}
        </Text>
        <div className="grid items-start analytics-features-mobile-tiles-grid md:analytics-features-tablet-tiles-grid lg:analytics-features-desktop-tiles-grid xl:analytics-features-desktop-hd-tiles-grid relative">
          <div className="analytics-features-tile-1-area grid justify-items-center pl-20px pr-20px md:pr-29px">
            <Text typography="h4" className="text-center mt-30px lg:mt-41px xl:mt-50px">
              {feature1Title}
            </Text>
            <Text typography="body" className="mt-22px md:mt-20px mb-30px lg:mb-50px text-tile-bg-4 text-center">
              {feature1Content}
            </Text>
          </div>
          <Border className="analytics-features-tile-1-area pl-82px md:pl-0px pr-82px md:pr-9px" borderSide="bottom" />
          <Border
            className="analytics-features-tile-1-area pt-30px lg:pt-41px xl:pt-50px pb-10px hidden md:block"
            borderSide="right"
          />

          <div className="analytics-features-tile-2-area grid justify-items-center pl-20px md:pl-29px lg:pl-27px pr-20px md:pr-20px lg:pr-27px">
            <Text typography="h4" className="text-center mt-30px lg:mt-41px xl:mt-50px">
              {feature2Title}
            </Text>
            <Text typography="body" className="mt-22px md:mt-20px mb-30px lg:mb-50px text-tile-bg-4 text-center">
              {feature2Content}
            </Text>
          </div>
          <Border
            className="analytics-features-tile-2-area pl-82px md:pl-9px pr-82px md:pr-0px lg:pr-9px"
            borderSide="bottom"
          />
          <Border
            className="analytics-features-tile-2-area pl-82px md:pl-0px pr-82px md:pr-0px md:hidden"
            borderSide="top"
          />
          <Border
            className="analytics-features-tile-2-area pt-30px lg:pt-41px xl:pt-50px pb-10px hidden md:block"
            borderSide="left"
          />
          <Border
            className="analytics-features-tile-2-area pt-30px lg:pt-41px xl:pt-50px pb-10px hidden lg:block"
            borderSide="right"
          />

          <div className="analytics-features-tile-3-area grid justify-items-center pl-20px lg:pl-29px pr-20px md:pr-29px lg:pr-20px">
            <Text typography="h4" className="text-center mt-30px lg:mt-41px xl:mt-50px">
              {feature3Title}
            </Text>
            <Text typography="body" className="mt-22px md:mt-20px mb-30px lg:mb-50px text-tile-bg-4 text-center">
              {feature3Content}
            </Text>
          </div>
          <Border
            className="analytics-features-tile-3-area pl-82px md:pl-0px lg:pl-9px pr-82px md:pr-9px lg:pr-9px"
            borderSide="bottom"
          />
          <Border
            className="analytics-features-tile-3-area pl-82px md:pl-0px pr-82px md:pr-9px lg:hidden"
            borderSide="top"
          />
          <Border
            className="analytics-features-tile-3-area pt-10px pb-10px hidden md:block lg:hidden"
            borderSide="right"
          />
          <Border
            className="analytics-features-tile-3-area pt-30px lg:pt-41px xl:pt-50px pb-10px hidden lg:block"
            borderSide="left"
          />

          <div className="analytics-features-tile-4-area grid justify-items-center pl-20px md:pl-29px lg:pl-20px pr-20px lg:pr-29px">
            <Text typography="h4" className="text-center mt-30px lg:mt-41px xl:mt-50px">
              {feature4Title}
            </Text>
            <Text typography="body" className="mt-22px md:mt-20px mb-30px lg:mb-50px text-tile-bg-4 text-center">
              {feature4Content}
            </Text>
          </div>
          <Border
            className="analytics-features-tile-4-area pl-82px md:pl-9px pr-82px md:pr-0px lg:hidden"
            borderSide="bottom"
          />
          <Border
            className="analytics-features-tile-4-area pl-82px md:pl-9px lg:pl-0px pr-82px md:pr-0px lg:pr-9px"
            borderSide="top"
          />
          <Border
            className="analytics-features-tile-4-area pt-10px pb-30px lg:pb-50px hidden lg:block"
            borderSide="right"
          />
          <Border
            className="analytics-features-tile-4-area pt-10px pb-10px hidden md:block lg:hidden"
            borderSide="left"
          />

          <div className="analytics-features-tile-5-area grid justify-items-center pl-20px lg:pl-27px pr-20px md:pr-29px lg:pr-27px">
            <Text typography="h4" className="text-center mt-30px lg:mt-41px xl:mt-50px">
              {feature5Title}
            </Text>
            <Text typography="body" className="mt-22px md:mt-20px mb-30px lg:mb-50px text-tile-bg-4 text-center">
              {feature5Content}
            </Text>
          </div>
          <Border
            className="analytics-features-tile-5-area pl-82px md:pl-0px pr-82px md:pr-9px md:hidden"
            borderSide="bottom"
          />
          <Border
            className="analytics-features-tile-5-area pl-82px md:pl-0px lg:pl-9px pr-82px md:pr-9px"
            borderSide="top"
          />
          <Border
            className="analytics-features-tile-5-area pt-10px pb-30px lg:pb-50px hidden md:block"
            borderSide="right"
          />
          <Border
            className="analytics-features-tile-5-area pt-10px pb-30px lg:pb-50px hidden lg:block"
            borderSide="left"
          />

          <div className="analytics-features-tile-6-area grid justify-items-center pl-20px md:pl-29px pr-20px md:pr-20px lg:pr-20px">
            <Text typography="h4" className="text-center mt-30px lg:mt-41px xl:mt-50px">
              {feature6Title}
            </Text>
            <Text typography="body" className="mt-22px md:mt-20px mb-30px lg:mb-50px text-tile-bg-4 text-center">
              {feature6Content}
            </Text>
          </div>
          <Border className="analytics-features-tile-6-area pl-82px md:pl-9px pr-82px md:pr-0px" borderSide="top" />
          <Border
            className="analytics-features-tile-6-area pt-10px pb-30px lg:pb-50px hidden md:block"
            borderSide="left"
          />
        </div>
      </div>
    </div>
  );
};

AnalyticsFeatures.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  feature1Title: PropTypes.string,
  feature1Content: PropTypes.string,
  feature2Title: PropTypes.string,
  feature2Content: PropTypes.string,
  feature3Title: PropTypes.string,
  feature3Content: PropTypes.string,
  feature4Title: PropTypes.string,
  feature4Content: PropTypes.string,
  feature5Title: PropTypes.string,
  feature5Content: PropTypes.string,
  feature6Title: PropTypes.string,
  feature6Content: PropTypes.string,
};

AnalyticsFeatures.defaultProps = {
  title:
    "Fusce maximus ligula mauris, ac sodales leo consectetur at. Nunc sagittis nulla viverra, eleifend lacus quis, maximus lacus",
  subtitle: "Some text…",
  feature1Title: "title 1",
  feature1Content: "content 1",
  feature2Title: "title 2",
  feature2Content: "content 2",
  feature3Title: "title 3",
  feature3Content: "content 3",
  feature4Title: "title 4",
  feature4Content: "content 4",
  feature5Title: "title 5",
  feature5Content: "content 5",
  feature6Title: "title 6",
  feature6Content: "content 6",
};

export default AnalyticsFeatures;

// export const query = graphql`
//   fragment AnalyticsFeatures on ContentfulAnalyticsFeatures {
//     image {
//       ...Image
//     }
//     title
//     subtitle
//     feature1Title
//     feature1Content
//     feature2Title
//     feature2Content
//     feature3Title
//     feature3Content
//     feature4Title
//     feature4Content
//     feature5Title
//     feature5Content
//     feature6Title
//     feature6Content
//   }
// `;
