import React from "react";

import Hero from "./Hero";

// type1
import ImageHeroType1Mobile from "../../../assets/old_assets/hero/hero-type1-mobile.png";
import ImageHeroType1Tablet from "../../../assets/old_assets/hero/hero-type1-tablet.png";
import ImageHeroType1Web from "../../../assets/old_assets/hero/hero-type1-web.png";
import ImageHeroType1WebHd from "../../../assets/old_assets/hero/hero-type1-webhd.png";
// type2
import ImageHeroType2Mobile from "../../../assets/old_assets/hero/hero-type2-mobile.png";
import ImageHeroType2Tablet from "../../../assets/old_assets/hero/hero-type2-tablet.png";
import ImageHeroType2Web from "../../../assets/old_assets/hero/hero-type2-web.png";
import ImageHeroType2WebHd from "../../../assets/old_assets/hero/hero-type2-webhd.png";
// type3
import ImageHeroType3Mobile from "../../../assets/old_assets/hero/hero-type3-mobile.png";
import ImageHeroType3Tablet from "../../../assets/old_assets/hero/hero-type3-tablet.png";
import ImageHeroType3Web from "../../../assets/old_assets/hero/hero-type3-web.png";
import ImageHeroType3WebHd from "../../../assets/old_assets/hero/hero-type3-webhd.png";
// type4
import ImageHeroType4Mobile from "../../../assets/old_assets/hero/hero-type4-mobile.png";
import ImageHeroType4Tablet from "../../../assets/old_assets/hero/hero-type4-tablet.png";
import ImageHeroType4Web from "../../../assets/old_assets/hero/hero-type4-web.png";
import ImageHeroType4WebHd from "../../../assets/old_assets/hero/hero-type4-webhd.png";

export default {
  title: "Common/Hero",
  component: Hero,
};

const storybookBackgroundsMocks = {
  type1: {
    imageMobile: <img src={ImageHeroType1Mobile} alt="hero background" className="-mt-22px" />,
    imageTablet: <img src={ImageHeroType1Tablet} alt="hero background" className="-mt-42px" />,
    imageWeb: <img src={ImageHeroType1Web} alt="hero background" className="-mt-34px" />,
    imageWebHd: <img src={ImageHeroType1WebHd} alt="hero background" className="-mt-50px" />,
    heightCss: "h-890px sm+:h-1185px md+:h-852px lg+:h-1215px",
    titlePositionsDefaults: "mt-531px sm+:mt-507px md+:mt-333px lg+:mt-465px",
    subtitlePositionsDefaults: "mt-24px lg+:mt-34px sm+:ml-1px lg+:ml-3px",
  },
  type2: {
    imageMobile: <img src={ImageHeroType2Mobile} alt="hero background" className="-mt-18px" />,
    imageTablet: <img src={ImageHeroType2Tablet} alt="hero background" className="-mt-42px" />,
    imageWeb: <img src={ImageHeroType2Web} alt="hero background" className="-mt-36px" />,
    imageWebHd: <img src={ImageHeroType2WebHd} alt="hero background" className="-mt-50px" />,
    heightCss: "h-930px sm+:h-1196px md+:h-880px lg+:h-1196px",
    titlePositionsDefaults: "mt-432px sm+:mt-580px md+:mt-263px lg+:mt-442px",
    subtitlePositionsDefaults: "mt-24px sm+:ml-1px lg+:ml-0px",
  },
  type3: {
    imageMobile: <img src={ImageHeroType3Mobile} alt="hero background" />,
    imageTablet: <img src={ImageHeroType3Tablet} alt="hero background" />,
    imageWeb: <img src={ImageHeroType3Web} alt="hero background" className="-mt-34px" />,
    imageWebHd: <img src={ImageHeroType3WebHd} alt="hero background" className="-mt-34px" />,
    heightCss: "h-844px sm+:h-1189px md+:h-904px lg+:h-1262px",
    titlePositionsDefaults: "mt-462px sm+:mt-580px md+:mt-306px lg+:mt-442px",
    subtitlePositionsDefaults: "mt-24px sm+:ml-1px lg+:ml-0px",
  },
  type4: {
    imageMobile: <img src={ImageHeroType4Mobile} alt="hero background" />,
    imageTablet: <img src={ImageHeroType4Tablet} alt="hero background" />,
    imageWeb: <img src={ImageHeroType4Web} alt="hero background" className="-mt-25px" />,
    imageWebHd: <img src={ImageHeroType4WebHd} alt="hero background" className="-mt-25px" />,
    heightCss: "h-924px sm+:h-1183px md+:h-843px lg+:h-1198px",
    titlePositionsDefaults: "mt-462px sm+:mt-580px md+:mt-306px lg+:mt-442px",
    subtitlePositionsDefaults: "mt-24px sm+:ml-1px lg+:ml-0px",
  },
};

const Template = args => <Hero storybookBackgroundsMocks={storybookBackgroundsMocks} {...args} />;

export const AboutPage = Template.bind({});
AboutPage.args = {
  type: "type1",
  title: "We’re the friendly shop.",
  subtitle: "Amplify is unlike any other business solutions provider. The biggest difference? We become a partner.",
};

export const CRMPage = Template.bind({});
CRMPage.args = {
  type: "type2",
  title: "Customers are relationships developed thoughtfully.",
  subtitle:
    "The power of a CRM is its ability to curate the patterns and insights that align with its target audience.",
};

export const AnalyticsPage = Template.bind({});
AnalyticsPage.args = {
  type: "type3",
  title: "Realize the power of proactive data insights.",
  subtitle: "Start to make data-driven decisions for your business and see the difference for yourself.",
};

export const BlogPage = Template.bind({});
BlogPage.args = {
  type: "type4",
  title: "The latest insights and takes from Amplify.",
  subtitle: "Knowledge is power, and the goal of our blog is to help empower our (potential) partners.",
};
