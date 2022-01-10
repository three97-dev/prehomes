import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";

import Text from "../basic/text/Text";

import "./Hero.css";

const imageMobile = (
  <StaticImage
    src="../../../assets/old_assets/hero/hero-bg-mobile.png"
    alt="hero background"
    quality={100}
    placeholder="blurred"
    layout="fixed"
  />
);
const imageTablet = (
  <StaticImage
    src="../../../assets/old_assets/hero/hero-bg-tablet.png"
    alt="hero background"
    quality={100}
    placeholder="blurred"
    layout="fixed"
  />
);

const BACKGROUNDS = {
  type1: {
    imageMobile,
    imageTablet,
    imageWeb: (
      <StaticImage
        src="../../../assets/old_assets/hero/hero-type1-web.png"
        alt="hero background"
        quality={100}
        placeholder="blurred"
        layout="fixed"
        className="-mt-34px"
      />
    ),
    imageWebHd: (
      <StaticImage
        src="../../../assets/old_assets/hero/hero-type1-webhd.png"
        alt="hero background"
        quality={100}
        placeholder="blurred"
        layout="fixed"
        className="-mt-50px"
      />
    ),
    heightCss: "hero-h-bg-mobile sm+:hero-h-bg-tablet md+:hero-h-type1-web lg+:hero-h-type1-webhd",
    titlePositionsDefaults: "-mt-46px sm+:-mt-73px md+:-mt-84px lg+:-mt-136px",
    subtitlePositionsDefaults: "mt-24px lg+:mt-34px sm+:ml-1px lg+:ml-3px",
  },
  type2: {
    imageMobile,
    imageTablet,
    imageWeb: (
      <StaticImage
        src="../../../assets/old_assets/hero/hero-type2-web.png"
        alt="hero background"
        quality={100}
        placeholder="blurred"
        layout="fixed"
        className="-mt-36px"
      />
    ),
    imageWebHd: (
      <StaticImage
        src="../../../assets/old_assets/hero/hero-type2-webhd.png"
        alt="hero background"
        quality={100}
        placeholder="blurred"
        layout="fixed"
        className="-mt-50px"
      />
    ),
    heightCss: "hero-h-bg-mobile sm+:hero-h-bg-tablet md+:hero-h-type2-web lg+:hero-h-type2-webhd",
    titlePositionsDefaults: "-mt-46px sm+:-mt-73px md+:-mt-112px lg+:-mt-116px",
    subtitlePositionsDefaults: "mt-24px sm+:ml-1px lg+:ml-0px",
  },
  type3: {
    imageMobile,
    imageTablet,
    imageWeb: (
      <StaticImage
        src="../../../assets/old_assets/hero/hero-type3-web.png"
        alt="hero background"
        quality={100}
        placeholder="blurred"
        layout="fixed"
        className="-mt-34px"
      />
    ),
    imageWebHd: (
      <StaticImage
        src="../../../assets/old_assets/hero/hero-type3-webhd.png"
        alt="hero background"
        quality={100}
        placeholder="blurred"
        layout="fixed"
        className="-mt-34px"
      />
    ),
    heightCss: "hero-h-bg-mobile sm+:hero-h-bg-tablet md+:hero-h-type3-web lg+:hero-h-type3-webhd",
    titlePositionsDefaults: "-mt-46px sm+:-mt-73px md+:-mt-137px lg+:-mt-182px",
    subtitlePositionsDefaults: "mt-24px sm+:ml-1px lg+:ml-0px",
  },
  type4: {
    imageMobile,
    imageTablet,
    imageWeb: (
      <StaticImage
        src="../../../assets/old_assets/hero/hero-type4-web.png"
        alt="hero background"
        quality={100}
        placeholder="blurred"
        layout="fixed"
        className="-mt-25px"
      />
    ),
    imageWebHd: (
      <StaticImage
        src="../../../assets/old_assets/hero/hero-type4-webhd.png"
        alt="hero background"
        quality={100}
        placeholder="blurred"
        layout="fixed"
        className="-mt-25px"
      />
    ),
    heightCss: "hero-h-bg-mobile sm+:hero-h-bg-tablet md+:hero-h-type4-web lg+:hero-h-type4-webhd",
    titlePositionsDefaults: "-mt-46px sm+:-mt-73px md+:-mt-75px lg+:-mt-119px",
    subtitlePositionsDefaults: "mt-24px sm+:ml-1px lg+:ml-0px",
  },
};

const resolveBackgrounds = (type, backgrounds = BACKGROUNDS) => {
  const resolvedImages = backgrounds[type];
  if (!resolvedImages) {
    throw new Error(`Failed to resolve backgrounds type: ${type}`);
  }
  return resolvedImages;
};

const Hero = ({
  titlePositions,
  title,
  subtitlePositions,
  subtitle,
  type,
  className,
  storybookBackgroundsMocks,
  ...otherProps
}) => {
  const {
    imageMobile,
    imageTablet,
    imageWeb,
    imageWebHd,
    heightCss,
    titlePositionsDefaults,
    subtitlePositionsDefaults,
  } = resolveBackgrounds(type, storybookBackgroundsMocks);
  return (
    <div
      className={`grid hero-grid-mobile md+:hero-grid justify-items-center w-full relative overflow-hidden ${heightCss} ${className}`}
      {...otherProps}
    >
      <div className="absolute bottom-0px -z-10 w-max max-w-none sm+:hidden">{imageMobile}</div>
      <div className="absolute bottom-0px -z-10 w-max max-w-none hidden sm+:grid md+:hidden">{imageTablet}</div>
      <div className="absolute bottom-0px -z-10 w-max max-w-none hidden md+:grid lg+:hidden">{imageWeb}</div>
      <div className="absolute bottom-0px -z-10 w-max max-w-none hidden lg+:grid">{imageWebHd}</div>

      <div className="area-hero-content self-center w-full xl:max-w-screen-xl grid justify-items-center md+:justify-items-start sm+:text-center md+:text-left">
        <div className="sm+:ml-8px max-w-318px sm+:max-w-414px md+:max-w-535px lg+:max-w-672px">
          <Text typography="h1" className={titlePositions.length > 0 ? titlePositions : titlePositionsDefaults}>
            {title}
          </Text>
          <Text
            typography="h3"
            className={subtitlePositions.length > 0 ? subtitlePositions : subtitlePositionsDefaults}
          >
            {subtitle}
          </Text>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  type: PropTypes.oneOf(["type1", "type2", "type3", "type4"]),
  titlePositions: PropTypes.string,
  subtitlePositions: PropTypes.string,
  className: PropTypes.string,
  storybookBackgroundsMocks: PropTypes.object,
};

Hero.defaultProps = {
  title: "Some title",
  subtitle: "Some subtitle",
  type: "type1",
  titlePositions: "",
  subtitlePositions: "",
  className: "",
};

export default Hero;
