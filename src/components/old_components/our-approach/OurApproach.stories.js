import React from "react";

import OurApproach from "./OurApproach";

import ImageOurApproachTileOne from "../../../assets/old_assets/pages/about/our-approach-tile-img-1.svg";
import ImageOurApproachTileTwo from "../../../assets/old_assets/pages/about/our-approach-tile-img-2.svg";
import ImageOurApproachTileThree from "../../../assets/old_assets/pages/about/our-approach-tile-img-3.svg";
import ImageOurApproachTileFour from "../../../assets/old_assets/pages/about/our-approach-tile-img-4.svg";

export default {
  title: "About/Our Approach",
  component: OurApproach,
};

const Template = args => <OurApproach {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Our approach is simple...",
  subtitle: "We want to turn your CRM and Reporting Solutions into a top competitive advantage for your company.",
  centerText: "The Amplifying Method",
  tileOneImage: {
    mock: ImageOurApproachTileOne,
  },
  tileOneMainText: "UNDERSTAND YOUR BUSINESS",
  tileOneSecondaryText:
    "We are both business and tech-savvy – we will dive into your business and existing systems, understanding them as you would expect a senior employee to.",
  tileTwoImage: {
    mock: ImageOurApproachTileTwo,
  },
  tileTwoMainText: "ALIGN GOALS",
  tileTwoSecondaryText:
    "We will discuss your business and technology goals alongside your budget and available resources, ensuring we are fully aligned on how best to structure development.",
  tileThreeImage: {
    mock: ImageOurApproachTileThree,
  },
  tileThreeMainText: "DEVELOPMENT MANAGEMENT",
  tileThreeSecondaryText:
    "We have a proprietory built-in tool where you, your staff and our developers can view, suggest and review on-going development together to help identify priorities.",
  tileFourImage: {
    mock: ImageOurApproachTileFour,
  },
  tileFourMainText: "LAUNCH NEW INITIATIVES",
  tileFourSecondaryText:
    "Not only will we be there to help your current priorities, we will pro-actively suggest ways your business can take advantage of the latest technology developments.",
};
