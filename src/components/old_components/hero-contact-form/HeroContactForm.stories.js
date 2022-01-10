import React from "react";

import HeroContactForm from "./HeroContactForm";

import ImageHeroContactMobile from "../../../assets/old_assets/pages/contact/hero-contact-bg-mobile.png";
import ImageHeroContactTablet from "../../../assets/old_assets/hero/hero-bg-tablet.png";
import ImageHeroContactWeb from "../../../assets/old_assets/pages/contact/hero-contact-bg-web.png";
import ImageHeroContactHd from "../../../assets/old_assets/pages/contact/hero-contact-bg-webhd.png";

export default {
  title: "Contact/Hero Contact Form",
  component: HeroContactForm,
};

const storybookBackgroundsMocks = {
  MobileBg: ({ alt, className }) => <img src={ImageHeroContactMobile} alt={alt} className={className} />,
  TabletBg: ({ alt, className }) => <img src={ImageHeroContactTablet} alt={alt} className={className} />,
  WebBg: ({ alt, className }) => <img src={ImageHeroContactWeb} alt={alt} className={className} />,
  WebHdBg: ({ alt, className }) => <img src={ImageHeroContactHd} alt={alt} className={className} />,
};

const Template = args => <HeroContactForm storybookBackgroundsMocks={storybookBackgroundsMocks} {...args} />;

export const Default = Template.bind({});
Default.args = {};
