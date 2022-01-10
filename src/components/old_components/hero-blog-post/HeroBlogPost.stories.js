import React from "react";

import HeroBlogPost from "./HeroBlogPost";

import ImageHeroBlogPostMobile from "../../../assets/old_assets/hero-blog-post/backgrounds/blog-post-top-bg-mobile.png";
import ImageHeroBlogPostTablet from "../../../assets/old_assets/hero-blog-post/backgrounds/blog-post-top-bg-tablet.png";
import ImageHeroBlogPostWeb from "../../../assets/old_assets/hero-blog-post/backgrounds/blog-post-top-bg-web.png";
import ImageHeroBlogPostHd from "../../../assets/old_assets/hero-blog-post/backgrounds/blog-post-top-bg-webhd.png";
import HeroImageJpg from "../../../assets/old_assets/hero-blog-post/image/hero-image.jpg";

export default {
  title: "Blog/Hero Blog Post",
  component: HeroBlogPost,
};

const storybookBackgroundsMocks = {
  MobileBg: ({ alt, className }) => <img src={ImageHeroBlogPostMobile} alt={alt} className={className} />,
  TabletBg: ({ alt, className }) => <img src={ImageHeroBlogPostTablet} alt={alt} className={className} />,
  WebBg: ({ alt, className }) => <img src={ImageHeroBlogPostWeb} alt={alt} className={className} />,
  WebHdBg: ({ alt, className }) => <img src={ImageHeroBlogPostHd} alt={alt} className={className} />,
};

const Template = args => <HeroBlogPost storybookBackgroundsMocks={storybookBackgroundsMocks} {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Is CRM Really Worth the Investment?",
  subtitle: "How Small Business Can Realize ROI on a CRM",
  image: {
    mock: HeroImageJpg
  },
};
