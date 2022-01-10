import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

import Text from "../basic/text/Text";

import ArrowImage from "../../../assets/old_assets/hero-home/arrow-down.svg";

const BACKGROUNDS = {
  MobileBg: ({ alt, className }) => (
    <StaticImage
      src="../../../assets/old_assets/hero-home/hero-home-mobile.png"
      quality={100}
      placeholder="blurred"
      layout="fixed"
      alt={alt}
      className={className}
    />
  ),
  TabletBg: ({ alt, className }) => (
    <StaticImage
      src="../../../assets/old_assets/hero-home/hero-home-tablet.png"
      quality={100}
      placeholder="blurred"
      layout="fixed"
      alt={alt}
      className={className}
    />
  ),
  WebBg: ({ alt, className }) => (
    <StaticImage
      src="../../../assets/old_assets/hero-home/hero-home-web.png"
      quality={100}
      placeholder="blurred"
      layout="fixed"
      alt={alt}
      className={className}
    />
  ),
  WebHdBg: ({ alt, className }) => (
    <StaticImage
      src="../../../assets/old_assets/hero-home/hero-home-webhd.png"
      quality={100}
      placeholder="blurred"
      layout="fixed"
      alt={alt}
      className={className}
    />
  ),
};

const customRenderOptions = {
  renderMark: {
    [MARKS.UNDERLINE]: text => <span className="text-fontcolor-red">{text}</span>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <>{children}</>,
  },
};

const HeroHome = ({ title, subtitle, arrowText, className, storybookBackgroundsMocks, ...otherProps }) => {
  const { MobileBg, TabletBg, WebBg, WebHdBg } = storybookBackgroundsMocks || BACKGROUNDS;
  return (
    <div
      className={`grid justify-items-center w-full h-screen relative overflow-hidden ${className}`}
      {...otherProps}
    >
      <div className="absolute bottom-0px -z-10 w-max max-w-none sm+:hidden">
        <MobileBg alt="hero background" />
      </div>
      <div className="absolute bottom-0px -z-10 w-max max-w-none hidden sm+:grid md+:hidden">
        <TabletBg alt="hero background" />
      </div>
      <div className="absolute bottom-0px -z-10 w-max max-w-none hidden md+:grid lg+:hidden">
        <WebBg alt="hero background" />
      </div>
      <div className="absolute bottom-0px -z-10 w-max max-w-none hidden lg+:grid">
        <WebHdBg alt="hero background" />
      </div>

      <div className="grid w-full xl:max-w-screen-xl justify-self-start xl:justify-self-center justify-items-center md+:justify-items-start">
        <div className="md+:col-span-full md+:row-span-full md+:self-center md+:ml-139px lg+:ml-140px max-w-318px sm+:max-w-500px md+:max-w-535px lg+:max-w-812px">
          <Text
            typography="h1"
            color="text-white"
            className="text-center md+:text-left mt-147px sm+:mt-270px md+:mt-0px"
          >
            {title && title.raw ? renderRichText(title, customRenderOptions) : title}
          </Text>
          <Text
            typography="h3"
            color="text-white"
            className="text-center md+:text-left mt-24px sm+:mt-19px md+:mt-24px"
          >
            {subtitle}
          </Text>
        </div>
        <div className="md+:col-span-full md+:row-span-full justify-self-center self-end grid justify-items-center mt-30px mb-50px">
          <Text typography="learn-more" color="text-white" className="text-center">
            {arrowText}
          </Text>
          <img src={ArrowImage} alt="arrow" className="mt-5px" />
        </div>
      </div>
    </div>
  );
};

HeroHome.propTypes = {
  title: PropTypes.object,
  subtitle: PropTypes.string,
  arrowText: PropTypes.string,
  className: PropTypes.string,
};

HeroHome.defaultProps = {
  title: {},
  subtitle: "Some subtitle",
  arrowText: "Some text",
  className: "",
};

export default HeroHome;
