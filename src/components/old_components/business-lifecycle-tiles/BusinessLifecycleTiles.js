import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Image from "../basic/image/Image";

import Button from "../basic/button/Button";
import Border from "../basic/border/Border";

import HeadingImage from "../../../assets/old_assets/pages/home/heading-home-red-tablet.svg";
import CustomerTypeModal from "../customer-type-modal/CustomerTypeModal";

import "./BusinessLifecycleTiles.css";

import businessStylesBg from "../../../assets/old_assets/pages/home/business-styles-bg.svg";
import Text from "../basic/text/Text";

const BusinessLifecycleTiles = ({
  title,
  subtitle,
  tileOneImage,
  tile1CustomerTypeModal,
  blockTitle1,
  blockContent1,
  tileTwoImage,
  tile2CustomerTypeModal,
  blockTitle2,
  blockContent2,
  tileThreeImage,
  tile3CustomerTypeModal,
  blockTitle3,
  blockContent3,
  tileFourImage,
  tile4CustomerTypeModal,
  blockTitle4,
  blockContent4,
  homeSmthElse,
  homeSmthButtonLink,
  className,
  ...otherProps
}) => {
  const [showModalIndex, setShowModalIndex] = useState(null);

  useEffect(() => {
    if (showModalIndex !== null) {
      document.body.style.overflowY = "hidden";
    }

    return function cleanup() {
      if (showModalIndex !== null) {
        document.body.style.overflowY = "scroll";
      }
    };
  }, [showModalIndex]);

  const tileModals = [tile1CustomerTypeModal, tile2CustomerTypeModal, tile3CustomerTypeModal, tile4CustomerTypeModal];

  return (
    <>
      <div className={`grid justify-items-center w-full overflow-hidden ${className}`} {...otherProps}>
        <div className="grid relative justify-items-center businnes-life-cycle-tiles-mobile md:businnes-life-cycle-tiles-grid-tablet lg:businnes-life-cycle-tiles-grid-web lg+:businnes-life-cycle-tiles-grid-webHD mb-150px md:mb-215px lg:mb-237px lg+:mb-285px">
          <img
            src={businessStylesBg}
            alt="background"
            className="block absolute -z-10 -bottom-150px -right-140px md:-bottom-210px md:-right-284px lg:-bottom-221px lg:-right-140px lg+:-bottom-310px lg+:-right-140px max-w-none w-632pxpx md:w-1242px lg:w-1366px lg+:w-1920px"
          />
          <img
            src={HeadingImage}
            alt="background"
            className="hidden md:block lg:hidden absolute -z-10 -bottom-134px -left-144px"
          />
          <div className="businnes-life-cycle-tiles-title w-full">
            <Text typography="h2">{title}</Text>
            <Text typography="h3" color="text-fontcolor-body" className="lg+:hidden mt-23px md:mb-26px lg:mb-107px">
              {subtitle}
            </Text>
            <Text
              typography="body"
              color="text-fontcolor-body "
              className="hidden lg+:block mt-23px lg:mb-107px lg+:mb-130px"
            >
              {subtitle}
            </Text>
          </div>

          <div className="businnes-life-cycle-tiles-tiles1 hover:bg-line-color2 text-center px-20px md:pl-30px md:pr-33px lg:pl-20px lg:pr-28px pt-22px md:pt-30px lg:pt-0px">
            <button
              onClick={e => {
                setShowModalIndex(0);
                e.preventDefault();
              }}
            >
              <div>
                <Image image={tileOneImage} className="mx-auto w-115px lg+:w-174px" width="115" height="115" />
                <Text typography="h4" className="mt-22px">
                  {blockTitle1}
                </Text>
                <Text typography="body" color="text-fontcolor-body" className="mt-21px lg+:mr-2px pb-30px lg+:pb-5px">
                  {blockContent1}
                </Text>
              </div>
            </button>
          </div>
          <Border
            borderSide="right"
            className="businnes-life-cycle-tiles-tiles1 sm:hidden md:block lg:block justify-self-end md:max-h-310px lg:max-h-308px lg+:max-h-327px md:ml-9px lg:ml-0px md:pb-5px lg:pb-0px md:mt-52px lg:mt-0px"
          />

          <Border
            borderSide="bottom"
            className="businnes-life-cycle-tiles-tiles1 lg:hidden justify-self-center max-w-154px md:max-w-328px md:pr-5px lg:pr-0px"
          />

          <div className="businnes-life-cycle-tiles-tiles2 hover:bg-line-color2 text-center px-20px md:pr-20px md:pl-29px lg:px-25px pt-28px md:pt-30px lg:pt-0px">
            <button
              onClick={e => {
                setShowModalIndex(1);
                e.preventDefault();
              }}
            >
              <div>
                <Image image={tileTwoImage} className="mx-auto w-115px lg+:w-165px" width="115" height="115" />
                <Text typography="h4" className="mt-21px lg+:mt-31px">
                  {blockTitle2}
                </Text>
                <Text typography="body" color="text-fontcolor-body" className="mt-21px lg:mt-22px pb-30px lg+:pb-5px">
                  {blockContent2}
                </Text>
              </div>
            </button>
          </div>
          <Border
            borderSide="top"
            className="businnes-life-cycle-tiles-tiles2 md:hidden justify-self-center max-w-154px md:max-w-328px md:pr-5px lg:pr-0px"
          />
          <Border
            borderSide="bottom"
            className="businnes-life-cycle-tiles-tiles2 lg:hidden justify-self-center max-w-154px md:max-w-328px md:pl-5px lg:pl-0px"
          />
          <Border
            borderSide="left"
            className="businnes-life-cycle-tiles-tiles2 justify-self-end hidden md:block lg:max-h-308px md:max-h-310px lg:max-h-308px lg+:max-h-327px md:pb-5px lg:pb-0px md:mt-52px lg:mt-0px"
          />
          <Border
            borderSide="right"
            className="businnes-life-cycle-tiles-tiles2 justify-self-end hidden lg:block md:max-h-310px lg:max-h-308px lg+:max-h-327px"
          />
          <div className="businnes-life-cycle-tiles-tiles3 hover:bg-line-color2 text-center px-20px md:pl-30px md:pr-39px lg:px-30px pt-30px lg:pt-0px">
            <button
              onClick={e => {
                setShowModalIndex(2);
                e.preventDefault();
              }}
            >
              <div>
                <Image image={tileThreeImage} className="mx-auto w-115px lg+:w-165px" width="115" height="115" />
                <Text typography="h4" className="mt-21px lg+:mt-31px">
                  {blockTitle3}
                </Text>
                <Text typography="body" color="text-fontcolor-body" className="mt-21px lg+:mt-45px pb-30px lg+:pb-5px">
                  {blockContent3}
                </Text>
              </div>
            </button>
          </div>
          <Border
            borderSide="bottom"
            className="businnes-life-cycle-tiles-tiles3 md:hidden justify-self-center max-w-154px md:max-w-328px md:pr-5px lg:pr-0px"
          />
          <Border
            borderSide="left"
            className="businnes-life-cycle-tiles-tiles3 justify-self-start hidden lg:block lg:max-h-308px lg+:max-h-327px"
          />
          <Border
            borderSide="right"
            className="businnes-life-cycle-tiles-tiles3 hidden md:block justify-self-end max-w-154px md:max-h-285px lg:max-h-308px lg+:max-h-327px md:ml-9px lg:ml-0px md:pt-10px lg:pt-0px"
          />
          <Border
            borderSide="top"
            className="businnes-life-cycle-tiles-tiles3 lg:hidden justify-self-center max-w-154px md:max-w-328px md:pr-5px"
          />

          <div className="businnes-life-cycle-tiles-tiles4 hover:bg-line-color2 text-center px-20px lg:pr-20px md:pl-30px lg:pl-29px pt-30px lg:pt-0px">
            <button
              onClick={e => {
                setShowModalIndex(3);
                e.preventDefault();
              }}
            >
              <div>
                <Image image={tileFourImage} className="mx-auto w-115px lg+:w-165px" width="115" height="115" />
                <Text typography="h4" className="mt-21px lg+:mt-31px md:mx-10px">
                  {blockTitle4}
                </Text>
                <Text
                  typography="body"
                  color="text-fontcolor-body"
                  className="mt-21px md:mt-45px lg:mt-21px pb-30px lg+:pb-5px"
                >
                  {blockContent4}
                </Text>
              </div>
            </button>
          </div>
          <Border
            borderSide="left"
            className="businnes-life-cycle-tiles-tiles4 hidden md:block justify-self-start md:max-h-285px lg:max-h-308px lg+:max-h-327px md:mr-7px lg:mr-0px md:pt-10px lg:pt-0px"
          />
          <Border
            borderSide="top"
            className="businnes-life-cycle-tiles-tiles4 lg:hidden justify-self-center max-w-154px md:max-w-328px md:pl-5px"
          />
          <Button
            label={homeSmthElse}
            link={homeSmthButtonLink}
            className="businnes-life-cycle-tiles-button mt-50px md:mt-40px lg:mt-70px lg+:mt-125px w-full md:max-w-328px lg:max-w-352px lg+:max-w-536px"
          />
        </div>
      </div>
      {showModalIndex !== null ? (
        <div
          className="fixed z-100 h-full w-full grid justify-items-center top-0px left-0px modal-background overflow-y-auto"
          onClick={() => setShowModalIndex(null)}
        >
          <div className="mx-36px mt-36px mb-50px md:mx-0px md:my-auto md:pt-20px md:pb-40px lg+:pt-40px lg+:pb-60px">
            <div onClick={e => e.stopPropagation()}>
              <CustomerTypeModal
                image={tileModals[showModalIndex].image}
                color={`type${showModalIndex + 1}`}
                title={tileModals[showModalIndex].title}
                subtitle={tileModals[showModalIndex].subtitle}
                question={tileModals[showModalIndex].question}
                answer={tileModals[showModalIndex].answer}
                onClick={() => setShowModalIndex(null)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

BusinessLifecycleTiles.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  tileOneImage: PropTypes.object,
  blockTitle1: PropTypes.string,
  blockContent1: PropTypes.string,
  tileTwoImage: PropTypes.object,
  blockTitle2: PropTypes.string,
  blockContent2: PropTypes.string,
  tileThreeImage: PropTypes.object,
  blockTitle3: PropTypes.string,
  blockContent3: PropTypes.string,
  tileFourImage: PropTypes.object,
  blockTitle4: PropTypes.string,
  blockContent4: PropTypes.string,
  homeSmthElse: PropTypes.string,
  homeSmthButtonLink: PropTypes.string,
  className: PropTypes.string,
};

BusinessLifecycleTiles.defaultProps = {
  title: "some title",
  subtitle: "some subtitle",
  blockTitle1: "some blockTitle1",
  blockContent1: "some blockContent1",
  blockTitle2: "some blockTitle2",
  blockContent2: "some blockContent2",
  blockTitle3: "some blockTitle3",
  blockContent3: "some blockContent3",
  blockTitle4: "some blockTitle4",
  blockContent4: "some blockContent4",
  homeSmthElse: "some homeSmthElse",
  homeSmthButtonLink: "/",
  className: "",
};

export default BusinessLifecycleTiles;

// export const query = graphql`
//   fragment BusinessLifecycleTiles on ContentfulBusinessLifecycleTiles {
//     title
//     subtitle
//     buttonLabel
//     buttonUrl
//     tile1Image {
//       ...Image
//     }
//     tile1Title
//     tile1Content
//     tile1CustomerTypeModal {
//       ...CustomerTypeModal
//     }
//     tile2Image {
//       ...Image
//     }
//     tile2Title
//     tile2Content
//     tile2CustomerTypeModal {
//       ...CustomerTypeModal
//     }
//     tile3Image {
//       ...Image
//     }
//     tile3Title
//     tile3Content
//     tile3CustomerTypeModal {
//       ...CustomerTypeModal
//     }
//     tile4Image {
//       ...Image
//     }
//     tile4Title
//     tile4Content
//     tile4CustomerTypeModal {
//       ...CustomerTypeModal
//     }
//   }
// `;
