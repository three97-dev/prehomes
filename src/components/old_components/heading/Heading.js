import React from "react";
import PropTypes from "prop-types";

import Text from "../basic/text/Text";
import UniversalLink from "../../../utils/UniversalLink";

import ImageArrowRightButton from "../../../assets/old_assets/heading/arrow-right-button.svg";
import HeadingImage from "../../../assets/old_assets/heading/heading-home-blue-webhd.svg";

import "./Heading.css";

const BLUE_HEADING_BACKGROUNDS = {
  type1: (
    <img
      src={HeadingImage}
      alt="heading home"
      className="hidden md:block absolute z-10 -top-96px lg:-top-180px xl:-top-300px -left-76px lg:-left-83px xl:-left-170px w-176px lg:w-260px xl:w-auto"
    />
  ),
  type2: (
    <img
      src={HeadingImage}
      alt="heading about"
      className="hidden md:block absolute z-10 -bottom-120px lg:-bottom-133px lg:-bottom-147px -left-130px lg:-left-101px xl:-left-61px w-203px"
    />
  ),
  type3: (
    <img
      src={HeadingImage}
      alt="heading crm"
      className="hidden md:block absolute z-10 -top-79px lg:-top-148px xl:-top-156px -left-37px xl:-left-35px lg:-left-33px w-150px lg:w-203px xl:w-221px"
    />
  ),
  type4: (
    <img
      src={HeadingImage}
      alt="heading crm"
      className="hidden lg:block absolute z-10 -bottom-147px xl:-bottom-213px -left-11px xl:-left-1px w-185px xl:w-250px"
    />
  ),
};

const resolveBlueHeadingBackgrounds = type => {
  if (BLUE_HEADING_BACKGROUNDS[type]) {
    return BLUE_HEADING_BACKGROUNDS[type];
  } else {
    return null;
  }
};

const RightBackground = ({ className }) => {
  return (
    <svg width="354" height="210" viewBox="0 0 354 210" preserveAspectRatio="none" className={className}>
      <defs>
        <clipPath id="clip-path">
          <rect id="bg" width="354" height="210" transform="translate(0 111.069)" fill="#d47fa6" />
        </clipPath>
      </defs>
      <g id="heading-red-redo" transform="translate(0 -111.069)" clipPath="url(#clip-path)">
        <path
          id="path"
          d="M661.207,350.074c-19.789-1-20.254-24.714-40-25s-24.866,29.859-40,30-30.017-42.286-53-44-33.441,21.241-59,21-41.892-35.1-71-37-36.887,26.809-62,26-39.335-78.194-83-82-50.537,50.573-95,51-24.4,24.1-67,25-107,76-107,76h707Z"
          transform="translate(252.793 -70.006)"
          fill="#ffc1dd"
          opacity="0.177"
        />
        <path
          id="path-2"
          data-name="path"
          d="M22.477,349.074c25.157-.993,25.9-23.714,51-24s31.761,29.859,51,30,37.783-43.291,67-45,42.509,22.24,75,22,54-35.1,91-37,46.075,26.807,78,26,50.49-78.2,106-82,64.476,50.574,121,51,30.85,24.1,85,25,136,76,136,76h-899Z"
          transform="translate(-292.477 -70.006)"
          fill="#fff"
          opacity="0.159"
        />
      </g>
    </svg>
  );
};

const LeftBackground = ({ className }) => {
  return (
    <svg width="354" height="210" viewBox="0 0 354 210" preserveAspectRatio="none" className={className}>
      <defs>
        <clipPath id="clip-path">
          <rect id="bg" width="354" height="210" transform="translate(0 110.977)" fill="#d47fa6" />
        </clipPath>
      </defs>
      <g id="heading-blue-bg" transform="translate(0 -110.977)" clipPath="url(#clip-path)">
        <path
          id="path"
          d="M14.441,349.982c19.789-1,20.254-24.714,40-25s24.866,29.859,40,30,30.017-42.286,53-44,33.441,22.241,59,22,41.892-35.1,71-37,36.887,25.809,62,25,39.335-77.194,83-81,50.537,49.573,95,50,24.4,24.1,67,25,107,76,107,76h-707Z"
          transform="translate(-574.441 -70.006)"
          fill="#ffc1dd"
          opacity="0.177"
        />
        <path
          id="path-2"
          data-name="path"
          d="M845.064,349.982c-25.157-.993-25.9-24.714-51-25s-31.761,29.859-51,30-37.783-42.291-67-44-42.508,21.24-75,21-54-34.1-91-36-46.075,25.807-78,25-50.49-77.2-106-81-64.476,49.574-121,50-30.85,24.1-85,25-136,76-136,76h899Z"
          transform="translate(-221.064 -70.006)"
          fill="#fff"
          opacity="0.159"
        />
      </g>
    </svg>
  );
};

const Heading = ({ direction, color, text, link, isHuge, type, className, ...otherProps }) => {
  const colorCss = color === "blue" ? "bg-heading-blue" : "bg-heading-red";
  if (direction === "left") {
    return (
      <div className={`w-full ${className}`} {...otherProps}>
        <div
          className={`grid relative heading-grid-left-mobile md:heading-grid-left-tablet lg:heading-grid-left-web xl:heading-grid-left-webhd items-center h-210px ${
            isHuge ? "xl:h-260px" : ""
          }  mr-36px lg:mr-75px xl:mr-140px rounded-tr-80px rounded-br-80px ${colorCss}`}
        >
          {resolveBlueHeadingBackgrounds(type)}
          <LeftBackground className="w-full h-full col-span-full row-span-full" />
          <div className="area-heading-text ml-36px md:ml-81px lg:ml-139px xl:ml-140px">
            <Text typography="h2" color="text-white">
              {text}
            </Text>
          </div>
          <div className="area-heading-link">
            <UniversalLink link={link}>
              <img src={ImageArrowRightButton} alt="arrow" className="arrow-shadow ml-12px w-70px lg:w-76px" />
            </UniversalLink>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`w-full ${className}`} {...otherProps}>
        <div
          className={`grid heading-grid-right-mobile md:heading-grid-right-tablet lg:heading-grid-right-web items-center h-210px ${
            isHuge ? "xl:h-260px" : ""
          } ml-36px lg:ml-75px xl:ml-140px rounded-tl-80px rounded-bl-80px ${colorCss}`}
        >
          <RightBackground className="w-full h-full col-span-full row-span-full" />
          <div className="area-heading-text ml-82px md:ml-45px lg:ml-64px xl:ml-138px">
            <Text typography="h2" color="text-white">
              {text}
            </Text>
          </div>
          <div className="area-heading-link">
            <UniversalLink link={link}>
              <img
                src={ImageArrowRightButton}
                alt="arrow"
                className="arrow-shadow ml-10px w-72px md:w-70px lg:w-76px"
              />
            </UniversalLink>
          </div>
        </div>
      </div>
    );
  }
};

Heading.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
  color: PropTypes.oneOf(["blue", "red"]),
  text: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
};

Heading.defaultProps = {
  direction: "left",
  color: "blue",
  link: "/",
  className: "",
};

export default Heading;
