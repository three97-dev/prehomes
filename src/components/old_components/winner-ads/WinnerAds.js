import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Image from "../basic/image/Image";
import Text from "../basic/text/Text";
import TileShadow from "../basic/tile-shadow/TileShadow";

import ImageBackgroundWebHD1 from "../../../assets/old_assets/pages/about/winner-ads-bg-webhd-1.svg";
import ImageBackgroundWebHD2 from "../../../assets/old_assets/pages/about/winner-ads-bg-webhd-2.svg";
import ImageBackgroundWeb1 from "../../../assets/old_assets/pages/about/winner-ads-bg-web-1.svg";
import ImageBackgroundWeb2 from "../../../assets/old_assets/pages/about/winner-ads-bg-web-2.svg";
import ImageBackgroundTablet1 from "../../../assets/old_assets/pages/about/winner-ads-bg-tablet-1.svg";
import ImageBackgroundTablet2 from "../../../assets/old_assets/pages/about/winner-ads-bg-tablet-2.svg";

import "./WinnerAds.css";

const WinnerAds = ({ tileImage, title, subtitle, blockContent, tileText, className, ...otherProps }) => {
  return (
    <div className={`grid justify-items-center w-full overflow-hidden ${className}`} {...otherProps}>
      <div className="grid relative winner-grid-mobile md:winner-grid-tablet lg:winner-grid-desc xl:winner-grid-HD lg:items-center mb-50px md:mb-250px lg:mb-295px xl:mb-221px md:mt-140px lg:mt-278px xl:mt-333px">
        <img
          src={ImageBackgroundTablet1}
          alt="background"
          className="hidden md:block lg:hidden absolute -z-10 md:bottom-640px md:-right-63px max-w-none"
        />
        <img
          src={ImageBackgroundTablet2}
          alt="background"
          className="hidden md:block lg:hidden absolute -z-10 md:-bottom-236px md:-right-172px max-w-none"
        />

        <img
          src={ImageBackgroundWeb1}
          alt="background"
          className="hidden lg:block xl:hidden absolute -z-10 lg:-bottom-260px lg:-right-260px max-w-none"
        />
        <img
          src={ImageBackgroundWeb2}
          alt="background"
          className="hidden lg:block xl:hidden absolute -z-10 lg:bottom-257px lg:-right-92px max-w-none"
        />

        <img
          src={ImageBackgroundWebHD1}
          alt="background"
          className="hidden xl:block absolute -z-10 xl:bottom-165px xl:-right-63px max-w-none"
        />
        <img
          src={ImageBackgroundWebHD2}
          alt="background"
          className="hidden xl:block absolute -z-10 xl:-bottom-333px xl:-right-203px max-w-none"
        />
        <Text typography="h2" className="winner-title-area mb-10px xl:mt-20px">
          {title}
        </Text>
        <Text typography="h3" className="winner-subtitle-area mb-20px lg:mb-25px md:mb-33px xl:mb-20px">
          {subtitle}
        </Text>
        <Text text={blockContent} className="winner-content-area mb-20px mb-50px lg:mb-0px" />
        <div className="winner-shadow-area md:pl-12px lg:pl-0px">
          <TileShadow
            color="type5"
            hasContentBg={true}
            className="text-center mx-auto md:w-500px lg:w-444px xl:w-672px"
          >
            <div className="md:pr-15px lg:pr-0px pb-30px md:pb-50px">
              <Text
                typography="h4"
                className="mx-auto w-236px md:w-405px px-40px md:px-0px md:pt-40px xl:pt-50px md:pb-37px xl:pb-40px py-20px"
              >
                {tileText}
              </Text>
              <div className="w-176px md:w-344px xl:w-398px mx-auto">
                <Image image={tileImage} />
              </div>
            </div>
          </TileShadow>
        </div>
      </div>
    </div>
  );
};

WinnerAds.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  blockContent: PropTypes.object,
  className: PropTypes.string,
  tileText: PropTypes.string,
  tileImage: PropTypes.object,
};

WinnerAds.defaultProps = {
  title: "some title",
  subtitle: "some subtitle",
  blockContent: "some blockContent",
  className: "some className",
  tileText: "some tileText",
};

export default WinnerAds;

// export const query = graphql`
//   fragment WinnerAds on ContentfulWinnerAds {
//     image {
//       ...Image
//     }
//     title
//     subtitle
//     blockContent {
//       raw
//     }
//     tileText
//   }
// `;
