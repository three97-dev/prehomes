import React from "react";

import WhyAmplify from "./WhyAmplify";

export default {
  title: "About/Why Amplify",
  component: WhyAmplify,
};

const Template = args => <WhyAmplify {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Why Amplify?",
  subtitle:
    "Our advantage is built around finding a flat monthly consulting fee, as opposed to hourly logs and project quotes.",
  blockTitle1: "WE’RE NOT JUST PROGRAMMERS, WE’RE ALSO BUSINESSPEOPLE",
  blockContent1:
    "We take the time to fully understand your business so we can pro-actively suggest ways that Dynamics 365 and Power BI can help you succeed and grow.",
  blockTitle2: "WE BELIEVE IN FINDING VALUE TOGETHER",
  blockContent2:
    "We find a flat monthly fee that fits your business so we can focus on finding value without needing to worry about increased costs or going over budget.",
  blockTitle3: "WE’RE AGILE AND FAST WITHOUT SACRIFICING QUALITY",
  blockContent3:
    "With our approach we have been able to implement and further enhance our clients CRM and Reporting at an industry leading pace.",
};
