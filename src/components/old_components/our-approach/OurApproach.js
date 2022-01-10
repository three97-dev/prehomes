import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Image from "../basic/image/Image";
import Text from "../basic/text/Text";
import Border from "../basic/border/Border";

import ImageCenterBackground from "../../../assets/old_assets/pages/about/out-approach-center.svg";

import ImageBackgroundMobile from "../../../assets/old_assets/pages/about/our-approach-bg-mobile.svg";
import ImageBackgroundTablet from "../../../assets/old_assets/pages/about/our-approach-bg-tablet.svg";
import ImageBackgroundWeb1 from "../../../assets/old_assets/pages/about/our-approach-bg-web-1.svg";
import ImageBackgroundWebHd1 from "../../../assets/old_assets/pages/about/our-approach-bg-webhd-1.svg";

import "./OurApproach.css";

const OurApproach = ({
  title,
  subtitle,
  centerText,
  tileOneImage,
  tileOneMainText,
  tileOneSecondaryText,
  tileTwoImage,
  tileTwoMainText,
  tileTwoSecondaryText,
  tileThreeImage,
  tileThreeMainText,
  tileThreeSecondaryText,
  tileFourImage,
  tileFourMainText,
  tileFourSecondaryText,
  className,
  ...otherProps
}) => {
  return (
    <div className={`grid justify-items-center w-full overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative our-approach-grid-mobile md:our-approach-grid-tablet lg:our-approach-grid-web xl:our-approach-grid-webhd mx-35px lg:mx-0px md:pb-100px lg:pb-0px">
        <img
          src={ImageBackgroundMobile}
          alt="background"
          className="md:hidden absolute -z-10 bottom-0px -left-164px max-w-none"
        />
        <img
          src={ImageBackgroundTablet}
          alt="background"
          className="hidden md:block absolute -z-10 bottom-0px -left-512px lg:-left-155px xl:-left-165px max-w-none lg:w-1453px xl:w-2061px"
        />
        <img
          src={ImageBackgroundWeb1}
          alt="background"
          className="hidden lg:block xl:hidden absolute -z-10 -top-112px -left-103px max-w-none"
        />
        <img
          src={ImageBackgroundWebHd1}
          alt="background"
          className="hidden xl:block absolute -z-10 top-140px -left-95px max-w-none"
        />

        <div className="area-our-approach-title md:mb-50px lg:mb-0px">
          <Text typography="h2" className="mt-50px md:mt-100px">
            {title}
          </Text>
          <Text typography="h3" className="mt-22px">
            {subtitle}
          </Text>
        </div>
        <div className="area-our-approach-center justify-self-center mt-27px md:mt-6px md:absolute md:z-10 md:top-1/2 lg:top-525px xl:top-620px">
          <div className="relative h-156px lg:h-352px xl:h-536px w-156px lg:w-352px xl:w-536px grid items-center justify-items-center">
            <img
              src={ImageCenterBackground}
              alt="background"
              className="absolute -z-10 top-0px w-156px lg:w-352px xl:w-536px"
            />
            <Text typography="ourApproachSmall" color="text-white" className="lg:hidden text-center w-82px">
              {centerText}
            </Text>
            <Text
              typography="ourApproachWeb"
              color="text-white"
              className="hidden lg:block xl:hidden text-center w-197px"
            >
              {centerText}
            </Text>
            <Text typography="ourApproachWebhd" color="text-white" className="hidden xl:block text-center w-300px">
              {centerText}
            </Text>
          </div>
        </div>
        <div className="area-our-approach-tile-1 mx-22px md:mx-0px md:ml-15px lg:ml-0px md:mr-34px lg:mr-0px mt-30px md:mt-0px lg:absolute lg:top-221px xl:top-295px lg:max-w-316px lg:justify-self-center">
          <Image image={tileOneImage} className="mx-auto tile-image" width="115" height="115" />
          <Text typography="h4" className="text-center mt-22px">
            {tileOneMainText}
          </Text>
          <Text typography="body" className="text-center mt-20px mb-30px md:mb-7px">
            {tileOneSecondaryText}
          </Text>
        </div>
        <Border
          borderSide="bottom"
          className="area-our-approach-tile-1 lg:hidden justify-self-center max-w-154px md:max-w-none md:pr-78px"
        />
        <Border borderSide="right" className="area-our-approach-tile-1 hidden md:block lg:hidden pt-8px pb-110px" />

        <div className="area-our-approach-tile-2 mx-22px md:mx-0px md:ml-34px lg:ml-0px md:mr-15px lg:mr-0px mt-30px md:mt-0px lg:absolute lg:top-565px xl:top-775px lg:right-20px xl:right-32px lg:max-w-316px xl:max-w-496px">
          <Image image={tileTwoImage} className="mx-auto tile-image" width="115" height="115" />
          <Text typography="h4" className="text-center mt-22px">
            {tileTwoMainText}
          </Text>
          <Text typography="body" className="text-center mt-20px mb-30px md:mb-78px">
            {tileTwoSecondaryText}
          </Text>
        </div>
        <Border borderSide="top" className="area-our-approach-tile-2 md:hidden justify-self-center max-w-154px" />
        <Border
          borderSide="bottom"
          className="area-our-approach-tile-2 lg:hidden justify-self-center max-w-154px md:max-w-none md:pl-78px"
        />
        <Border borderSide="left" className="area-our-approach-tile-2 hidden md:block lg:hidden pt-8px pb-110px" />

        <div className="area-our-approach-tile-3 mx-22px md:mx-0px md:ml-15px lg:ml-0px md:mr-34px lg:mr-0px mt-30px md:mt-80px lg:mt-0px lg:absolute lg:bottom-97px xl:bottom-135px lg:justify-self-center lg:max-w-316px xl:max-w-496px">
          <Image image={tileThreeImage} className="mx-auto tile-image" width="115" height="115" />
          <Text typography="h4" className="text-center mt-22px">
            {tileThreeMainText}
          </Text>
          <Text typography="body" className="text-center mt-20px mb-30px md:mb-0px">
            {tileThreeSecondaryText}
          </Text>
        </div>
        <Border
          borderSide="top"
          className="area-our-approach-tile-3 lg:hidden justify-self-center max-w-154px md:max-w-none md:pr-78px"
        />
        <Border borderSide="bottom" className="area-our-approach-tile-3 md:hidden justify-self-center max-w-154px" />
        <Border borderSide="right" className="area-our-approach-tile-3 hidden md:block lg:hidden pt-78px" />

        <div className="area-our-approach-tile-4 mx-22px md:mx-0px md:ml-34px lg:ml-0px md:mr-15px mt-30px md:mt-80px lg:mt-0px lg:absolute lg:top-565px xl:top-775px lg:left-20px xl:left-32px lg:max-w-316px xl:max-w-496px">
          <Image image={tileFourImage} className="mx-auto tile-image" width="115" height="115" />
          <Text typography="h4" className="text-center mt-22px">
            {tileFourMainText}
          </Text>
          <Text typography="body" className="text-center mt-20px mb-30px md:mb-0px">
            {tileFourSecondaryText}
          </Text>
        </div>
        <Border
          borderSide="top"
          className="area-our-approach-tile-4 lg:hidden justify-self-center max-w-154px md:max-w-none md:pl-78px"
        />
        <Border borderSide="left" className="area-our-approach-tile-4 hidden md:block lg:hidden pt-78px" />
      </div>
    </div>
  );
};

OurApproach.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  centerText: PropTypes.string,
  tileOneImage: PropTypes.object,
  tileOneMainText: PropTypes.string,
  tileOneSecondaryText: PropTypes.string,
  tileTwoImage: PropTypes.object,
  tileTwoMainText: PropTypes.string,
  tileTwoSecondaryText: PropTypes.string,
  tileThreeImage: PropTypes.object,
  tileThreeMainText: PropTypes.string,
  tileThreeSecondaryText: PropTypes.string,
  tileFourImage: PropTypes.object,
  tileFourMainText: PropTypes.string,
  tileFourSecondaryText: PropTypes.string,
  className: PropTypes.string,
};

OurApproach.defaultProps = {
  title: "Some title",
  subtitle: "Some subtitle",
  tileOneMainText: "Tile 1",
  tileOneSecondaryText: "Tile 1",
  tileTwoMainText: "Tile 2",
  tileTwoSecondaryText: "Tile 2",
  tileThreeMainText: "Tile 3",
  tileThreeSecondaryText: "Tile 3",
  tileFourMainText: "Tile 4",
  tileFourSecondaryText: "Tile 4",
  className: "",
};

export default OurApproach;

// export const query = graphql`
//   fragment OurApproach on ContentfulOurApproach {
//     title
//     subtitle
//     centerText
//     tile1Image {
//       ...Image
//     }
//     tile1MainText
//     tile1SecondaryText
//     tile2Image {
//       ...Image
//     }
//     tile2MainText
//     tile2SecondaryText
//     tile3Image {
//       ...Image
//     }
//     tile3MainText
//     tile3SecondaryText
//     tile4Image {
//       ...Image
//     }
//     tile4MainText
//     tile4SecondaryText
//   }
// `;
