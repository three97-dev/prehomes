import React from "react";

import WinnerAds from "./WinnerAds";

import WinnerLogo from "../../../assets/old_assets/pages/about/winner-ads-img.png";

export default {
  title: "About/Winner Ads",
  component: WinnerAds,
};

const Template = args => <WinnerAds {...args} />;

export const Default = Template.bind({});
Default.args = {
  tileImage: {
    mock: WinnerLogo,
  },
  title: "Amplify the Good",
  subtitle: "Could a $50,000 technology investment help your cause?",
  blockContent: (
    <>
      Amplify Solutions will donate up to $50,000 in services toward building and supporting a customized CRM platform
      and business reporting tool for qualifying small to medium non-profit organizations.
      <br />
      <br />
      We believe strongly in supporting growing non-profit organizations by providing a foundation on which they can
      organize, expand and Amplify the Good they are doing for their communities.
      <br />
      <br />
      <strong>Keep an eye out for announcements on next year’s Amplify the Good and more chances to win!</strong>
    </>
  ),
  tileText: "CONGRATS TO OUR 2021 WINNER",
};
