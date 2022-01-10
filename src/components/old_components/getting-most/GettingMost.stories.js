import React from "react";

import GettingMost from "./GettingMost";

import BlockTile1Image from "../../../assets/old_assets/pages/analytics/getting-most-tile1.png";
import BlockTile2Image from "../../../assets/old_assets/pages/analytics/getting-most-tile2.png";
import BlockTile3Image from "../../../assets/old_assets/pages/analytics/getting-most-tile3.png";

export default {
  title: "Analytics/Getting Most",
  component: GettingMost,
};

const Template = args => <GettingMost {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Is your business getting the most out of your data?",
  subtitle:
    "We specialize in leveraging existing systems and data to create in-depth reporting and analytics that help our clients make better business decisions.",
  blockImage1: {
    mock: BlockTile1Image,
  },
  blockTitle1: "REAL-TIME AND PROACTIVITY",
  blockContent1: "Ensure you are able to flag trends and forecasts in real-time so you can act before it’s too late.",
  blockImage2: {
    mock: BlockTile2Image,
  },
  blockTitle2: "DATA DRIVEN",
  blockContent2: "Lead your meetings and reviews with data to get to richer conversations and better decisions.",
  blockImage3: {
    mock: BlockTile3Image,
  },
  blockTitle3: "SAVE TIME AND COSTS",
  blockContent3:
    "Connect directly to your data sources to avoid time spent on creating and managing one-off Excel reporting.",
};
