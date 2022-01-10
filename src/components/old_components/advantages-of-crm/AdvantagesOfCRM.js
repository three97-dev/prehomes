import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Border from "../basic/border/Border";
import Image from "../basic/image/Image";
import Text from "../basic/text/Text";

import AdvantagesOfCRMMobile from "../../../assets/old_assets/pages/crm/advantages-of-crm-bg-mobile.svg";
import AdvantagesOfCRMTabletPlus from "../../../assets/old_assets/pages/crm/advantages-of-crm-bg-tablet-plus.svg";

import "./AdvantagesOfCRM.css";

const AdvantagesOfCRM = ({
  title,
  advantages1Image,
  advantages1Title,
  advantages1Content,
  advantages2Image,
  advantages2Title,
  advantages2Content,
  advantages3Image,
  advantages3Title,
  advantages3Content,
  advantages4Image,
  advantages4Title,
  advantages4Content,
  advantages5Image,
  advantages5Title,
  advantages5Content,
  advantages6Image,
  advantages6Title,
  advantages6Content,
  className,
  ...otherProps
}) => {
  return (
    <div className={`grid justify-items-center overflow-hidden ${className}`} {...otherProps}>
      <div className="grid relative justify-items-center mx-36px md:mx-73px lg:mx-130px">
        <img
          src={AdvantagesOfCRMMobile}
          alt="background"
          className="block md:hidden justify-self-center absolute -z-10 bottom-0px max-w-none"
        />
        <img
          src={AdvantagesOfCRMTabletPlus}
          alt="background"
          className="hidden md:block justify-self-center absolute -z-10 bottom-0px xl:-left-165px h-462px lg:h-400px xl:h-auto max-w-none"
        />
        <Text typography="h2" className="text-center">
          {title}
        </Text>
        <div className="grid relative advantages-of-crm-mobile-tiles-grid md:advantages-of-crm-tablet-tiles-grid lg:advantages-of-crm-desktop-tiles-grid xl:advantages-of-crm-desktop-hd-tiles-grid items-start md:mt-20px lg:mt-25px xl:mt-50px mb-20px md:mb-74px lg:mb-100px xl:mb-150px">
          <div className="advantages-of-crm-tile-1-area grid justify-items-center pl-20px pr-20px">
            <Image
              image={advantages1Image}
              width="115"
              height="115"
              className="w-115px xl:w-165px h-115px xl:h-165px mt-30px lg:mt-50px"
            />
            <Text typography="h4" className="text-center mt-20px">
              {advantages1Title}
            </Text>
            <Text typography="body" className="text-center mt-20px mb-30px lg:mb-50px">
              {advantages1Content}
            </Text>
          </div>
          <Border className="advantages-of-crm-tile-1-area pl-82px md:pl-8px pr-82px md:pr-9px" borderSide="bottom" />
          <Border
            className="advantages-of-crm-tile-1-area pt-30px lg:pt-50px pb-9px hidden md:block"
            borderSide="right"
          />
          <div className="advantages-of-crm-tile-2-area grid justify-items-center pl-20px pr-20px">
            <Image
              image={advantages2Image}
              width="115"
              height="115"
              className="w-115px xl:w-165px h-115px xl:h-165px mt-30px lg:mt-50px"
            />
            <Text typography="h4" className="text-center mt-20px">
              {advantages2Title}
            </Text>
            <Text typography="body" className="text-center mt-20px mb-30px lg:mb-50px">
              {advantages2Content}
            </Text>
          </div>
          <Border
            className="advantages-of-crm-tile-2-area pl-82px md:pl-9px pr-82px md:pr-8px lg:pr-9px"
            borderSide="bottom"
          />
          <Border className="advantages-of-crm-tile-2-area pl-82px pr-82px md:hidden" borderSide="top" />
          <Border
            className="advantages-of-crm-tile-2-area pt-30px lg:pt-50px pb-9px hidden md:block"
            borderSide="left"
          />
          <Border className="advantages-of-crm-tile-2-area pt-50px pb-9px hidden lg:block" borderSide="right" />
          <div className="advantages-of-crm-tile-3-area grid justify-items-center pl-20px pr-20px">
            <Image
              image={advantages3Image}
              width="115"
              height="115"
              className="w-115px xl:w-165px h-115px xl:h-165px mt-30px lg:mt-50px"
            />
            <Text typography="h4" className="text-center mt-20px">
              {advantages3Title}
            </Text>
            <Text typography="body" className="text-center mt-20px mb-30px lg:mb-50px">
              {advantages3Content}
            </Text>
          </div>
          <Border
            className="advantages-of-crm-tile-3-area pl-82px md:pl-8px lg:pl-9px pr-82px md:pr-9px"
            borderSide="bottom"
          />
          <Border
            className="advantages-of-crm-tile-3-area pl-82px md:pl-8px pr-82px md:pr-9px lg:hidden"
            borderSide="top"
          />
          <Border className="advantages-of-crm-tile-3-area pt-50px pb-9px hidden lg:block" borderSide="left" />
          <Border
            className="advantages-of-crm-tile-3-area pt-9px pb-9px hidden md:block lg:hidden"
            borderSide="right"
          />
          <div className="advantages-of-crm-tile-4-area grid justify-items-center pl-20px pr-20px">
            <Image
              image={advantages4Image}
              width="115"
              height="115"
              className="w-115px xl:w-165px h-115px xl:h-165px mt-30px lg:mt-50px"
            />
            <Text typography="h4" className="text-center mt-20px">
              {advantages4Title}
            </Text>
            <Text typography="body" className="text-center mt-20px mb-30px lg:mb-50px">
              {advantages4Content}
            </Text>
          </div>
          <Border
            className="advantages-of-crm-tile-4-area pl-82px md:pl-9px pr-82px md:pr-8px lg:hidden"
            borderSide="bottom"
          />
          <Border
            className="advantages-of-crm-tile-4-area pl-82px md:pl-9px pr-82px md:pr-8px lg:pr-9px"
            borderSide="top"
          />
          <Border className="advantages-of-crm-tile-4-area pt-9px pb-9px hidden md:block lg:hidden" borderSide="left" />
          <Border className="advantages-of-crm-tile-4-area pt-9px pb-50px hidden lg:block" borderSide="right" />
          <div className="advantages-of-crm-tile-5-area grid justify-items-center pl-20px pr-20px">
            <Image
              image={advantages5Image}
              width="115"
              height="115"
              className="w-115px xl:w-165px h-115px xl:h-165px mt-30px lg:mt-50px"
            />
            <Text typography="h4" className="text-center mt-20px">
              {advantages5Title}
            </Text>
            <Text typography="body" className="text-center mt-20px mb-30px lg:mb-50px">
              {advantages5Content}
            </Text>
          </div>
          <Border className="advantages-of-crm-tile-5-area pl-82px pr-82px md:hidden" borderSide="bottom" />
          <Border
            className="advantages-of-crm-tile-5-area pl-82px md:pl-8px lg:pl-9px pr-82px md:pr-9px"
            borderSide="top"
          />
          <Border className="advantages-of-crm-tile-5-area pt-9px pb-50px hidden lg:block" borderSide="left" />
          <Border
            className="advantages-of-crm-tile-5-area pt-9px pb-30px lg:pb-50px hidden md:block"
            borderSide="right"
          />
          <div className="advantages-of-crm-tile-6-area grid justify-items-center pl-20px pr-20px">
            <Image
              image={advantages6Image}
              width="115"
              height="115"
              className="w-115px xl:w-165px h-115px xl:h-165px mt-30px lg:mt-50px"
            />
            <Text typography="h4" className="text-center mt-20px">
              {advantages6Title}
            </Text>
            <Text typography="body" className="text-center mt-20px mb-30px lg:mb-50px">
              {advantages6Content}
            </Text>
          </div>
          <Border
            className="advantages-of-crm-tile-6-area pl-82px md:pl-9px pr-82px md:pr-8px lg:pr-9px"
            borderSide="top"
          />
          <Border
            className="advantages-of-crm-tile-6-area pt-9px pb-30px lg:pb-50px hidden md:block"
            borderSide="left"
          />
        </div>
      </div>
    </div>
  );
};

AdvantagesOfCRM.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  advantages1Image: PropTypes.object,
  advantages1Title: PropTypes.string,
  advantages1Content: PropTypes.string,
  advantages2Image: PropTypes.object,
  advantages2Title: PropTypes.string,
  advantages2Content: PropTypes.string,
  advantages3Image: PropTypes.object,
  advantages3Title: PropTypes.string,
  advantages3Content: PropTypes.string,
  advantages4Image: PropTypes.object,
  advantages4Title: PropTypes.string,
  advantages4Content: PropTypes.string,
  advantages5Image: PropTypes.object,
  advantages5Title: PropTypes.string,
  advantages5Content: PropTypes.string,
  advantages6Image: PropTypes.object,
  advantages6Title: PropTypes.string,
  advantages6Content: PropTypes.string,
};

AdvantagesOfCRM.defaultProps = {
  className: "",
  title: "Some text",
  advantages1Title: "Some text",
  advantages1Content: "Some text Some text Some text Some text Some text Some text",
  advantages2Title: "Some text",
  advantages2Content: "Some text Some text Some text Some text Some text Some text",
  advantages3Title: "Some text",
  advantages3Content: "Some text Some text Some text Some text Some text Some text",
  advantages4Title: "Some text",
  advantages4Content: "Some text Some text Some text Some text Some text Some text",
  advantages5Title: "Some text",
  advantages5Content: "Some text Some text Some text Some text Some text Some text",
  advantages6Title: "Some text",
  advantages6Content: "Some text Some text Some text Some text Some text Some text",
};

export default AdvantagesOfCRM;

// export const query = graphql`
//   fragment AdvantagesOfCrm on ContentfulAdvantagesOfCrm {
//     title
//     advantages1Image {
//       ...Image
//     }
//     advantages1Content
//     advantages1Title
//     advantages2Image {
//       ...Image
//     }
//     advantages2Title
//     advantages2Content
//     advantages3Image {
//       ...Image
//     }
//     advantages3Title
//     advantages3Content
//     advantages4Image {
//       ...Image
//     }
//     advantages4Title
//     advantages4Content
//     advantages5Image {
//       ...Image
//     }
//     advantages5Title
//     advantages5Content
//     advantages6Image {
//       ...Image
//     }
//     advantages6Title
//     advantages6Content
//   }
// `;
