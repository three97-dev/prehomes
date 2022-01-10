import React from "react";

import YoutubeVideo from "./YoutubeVideo";

export default {
  title: "Analytics/Youtube Video",
  component: YoutubeVideo,
};

export const Default = args => <YoutubeVideo {...args} style={{ gridArea: "area1" }} />;
Default.args = {
  title: "Want to see Power BI in action?",
  content:
    "Power BI is feature-rich data mashup and report authoring tool that helps you understand data quality and formatting issues.",
  videoLink: "https://www.youtube.com/embed/YKSNBIlM_bY",
};
