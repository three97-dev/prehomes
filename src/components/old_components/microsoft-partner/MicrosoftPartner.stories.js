import React from "react";

import MicrosoftPartner from "./MicrosoftPartner";

import ImageMicrosoftPartner from "../../../assets/old_assets/pages/home/microsoft-partner.svg";

export default {
  title: "Home/Microsoft Partner",
  component: MicrosoftPartner,
};

const Template = args => <MicrosoftPartner {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Partnerships are critical to long-term success.",
  mainText:
    "We’re a Microsoft Silver Partner, which means you can trust us with all things Dynamics 365 CRM and Power BI.",
  secondaryText:
    "This type of partnership with Microsoft is earned through experience in working with Dynamics 365, Power BI, Microsoft Teams, SharePoint, Power Apps, Power Automate and many more Microsoft products!",
  image: {
    mock: ImageMicrosoftPartner,
  },
};
