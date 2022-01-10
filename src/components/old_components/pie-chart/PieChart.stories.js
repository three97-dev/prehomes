import React from "react";

import PieChart from "./PieChart";

export default {
  title: "CRM/PieChart",
  component: PieChart,
};

const Template = args => <PieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "The “Amplify” Difference",
  subtitle:
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
