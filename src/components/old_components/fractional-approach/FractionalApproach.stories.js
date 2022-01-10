import React from "react";

import FractionalApproach from "./FractionalApproach";

export default {
  title: "Home/Fractional Approach",
  component: FractionalApproach,
  argTypes: {
    color: {
      options: ["type1", "type2", "type3", "type4", "type5", "type6"],
      control: { type: "select" },
    },
    hasContentBg: true,
    spacing: {
      options: ["10px", "20px"],
      control: { type: "radio" },
    },
  },
};

const Template = args => <FractionalApproach {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "We believe the fractional approach provides optimal value to our clients.",
  description: {
    raw: '{"nodeType":"document","data":{},"content":[{"nodeType":"paragraph","content":[{"nodeType":"text","value":"Most emerging businesses are focused on maintaining their bottom line costs while challenged with growing and optimizing their revenues with existing resources. The opportunity that technology and tooling provides is intended to unlock new efficiencies that manual process often cannot.","marks":[],"data":{}}],"data":{}},{"nodeType":"paragraph","content":[{"nodeType":"text","value":"Unfortunately, many small business implementing technologies fall short in realizing the business value that was initially driving their business case. The cost to continue developing the capability can become out of reach for many or uninspiring for others.","marks":[],"data":{}}],"data":{}},{"nodeType":"paragraph","content":[{"nodeType":"text","value":"We work with companies to cost effectively provide a fractional solution that takes care of optimizing your CRM technology and sales operations through partnership.","marks":[],"data":{}}],"data":{}}]}',
  },
  subtitle: "Fractional CRM has a fit for all.",
  subtitleContent:
    "Business of this size need to allocate their staff towards revenue generating activities, while we focus on optimizing their day to day.",
  stats: "2-30+",
  statsDescription: "Sales Staff",
  tile1Number: "100%",
  tile1Description: "MET/EXCEEDED EXPECTATIONS",
  tile2Number: "94%",
  tile2Description: "CLIENT SATISFACTION RATING",
  titlePieChart: "The “Amplify” Difference",
  subtitlePieChart:
    "We look to partner and grow with each of our clients, we like to be thought of as a “Fractional CRM Department”.",
  content:
    "The impacts of a high functioning CRM are substantial. But getting there is not easy as evident in the industry report that 49% of CRM projects fail. We have found an approach that has lead to overwhelming satisfaction at a discounted cost.",
  leftBlockTitle: "ALIGNMENT",
  leftBlockContent: "We structure our partnership so we can dive in with our clients and proactively work together.",
  rightBlockTitle: "VALUE",
  rightBlockContent:
    "We only work on a flat consulting fee so there is less time on quotes, proposals, and approvals… And more time on development.",
  centerBlockTitle: "TRACK RECORD",
  centerBlockContent:
    "In an industry known to have a steep price and poor success rates, our approach has lead to a flawless success rate at a discount.",
};
