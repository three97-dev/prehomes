import React from "react";

import HeroHome from "./HeroHome";

import ImageHeroHomeMobile from "../../../assets/old_assets/hero-home/hero-home-mobile.png";
import ImageHeroHomeTablet from "../../../assets/old_assets/hero-home/hero-home-tablet.png";
import ImageHeroHomeWeb from "../../../assets/old_assets/hero-home/hero-home-web.png";
import ImageHeroHomeWebHd from "../../../assets/old_assets/hero-home/hero-home-webhd.png";

export default {
  title: "Home/Hero Home",
  component: HeroHome,
};

const storybookBackgroundsMocks = {
  MobileBg: ({ alt, className }) => <img src={ImageHeroHomeMobile} alt={alt} className={className} />,
  TabletBg: ({ alt, className }) => <img src={ImageHeroHomeTablet} alt={alt} className={className} />,
  WebBg: ({ alt, className }) => <img src={ImageHeroHomeWeb} alt={alt} className={className} />,
  WebHdBg: ({ alt, className }) => <img src={ImageHeroHomeWebHd} alt={alt} className={className} />,
};

const Template = args => <HeroHome storybookBackgroundsMocks={storybookBackgroundsMocks} {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: (
    <>
      Do you know <span className="text-fontcolor-red">the impact</span> a CRM can have on your business?
    </>
  ),
  subtitle: "A CRM can amplify your insights, providing new revenue opportunities and workforce efficiencies.",
  arrowText: "Learn More"
};
