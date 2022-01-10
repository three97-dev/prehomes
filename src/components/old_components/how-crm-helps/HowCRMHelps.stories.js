import React from "react";

import HowCRMHelps from "./HowCRMHelps";

import ImageHowCRMHelps from "../../../assets/old_assets/pages/crm/how-crm-helps-image.png";

export default {
  title: "CRM/How CRM Helps",
  component: HowCRMHelps,
};

const Template = args => <HowCRMHelps {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "How CRM Technology Helps",
  subtitle:
    "A CRM platform helps companies target different audiences, set scores and alerts based on an individual lead or customer’s activity, proactively work with contacts, and maintain relationships. Best of all, a CRM system can be used across departments to ensure that all customer-facing teams are empowered with the right data to create incredible customer experiences.",
  image: {
    mock: ImageHowCRMHelps,
  },
  mainText:
    "Microsoft is the only vendor that provides hardware, software, and internet-of-things (IoT) platforms to enable end-to-end customer service.",
  secondaryText: (
    <>
      Dynamics 365 is a collection of intelligent business applications that work together to run your business within
      one unified platform, helping drive consistency and efficiency.
      <br />
      <br /> Dynamics 365 is scalable – while it continues to excel in its core areas of sales process management and
      finance it also provides exceptional marketing, service, human resource and operations applications as well that
      can be layered in to create a complete business management solution.
    </>
  ),
};
