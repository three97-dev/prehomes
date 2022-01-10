import React from "react";

import Text from "./Text";

export default {
  title: "Basic/Texts",
  component: Text,
};

const Template = ({ text, ...args }) => <Text {...args}>{text}</Text>;

export const H1Story = Template.bind({});
H1Story.storyName = "H1 - Poppins Light";
H1Story.args = {
  text: (
    <>
      Do you know the <br />
      impact a CRM can
      <br /> have on your business?
    </>
  ),
  color: "text-white",
  typography: "h1",
};
H1Story.parameters = {
  backgrounds: { default: "dark" },
};

export const H2Story = Template.bind({});
H2Story.storyName = "H2 - Poppins Medium";
H2Story.args = {
  text: "Partnerships are critical to long-term success.",
  typography: "h2",
};

export const H3Story = Template.bind({});
H3Story.storyName = "H3 - Titillium Web Regular";
H3Story.args = {
  text: (
    <>
      We’re a Microsoft Silver Partner, which means you can trust us with all
      <br /> things Dynamics 365 CRM and Power BI.
    </>
  ),
  typography: "h3",
};

export const H4Story = Template.bind({});
H4Story.storyName = "H4 - Titillium Web Bold";
H4Story.args = {
  text: (
    <>
      WE’RE LOOKING TO IMPLEMENT
      <br /> OUR FIRST CRM.
    </>
  ),
  typography: "h4",
};

export const BodyStory = Template.bind({});
BodyStory.storyName = "Body - Work Sans Regular";
BodyStory.args = {
  text: (
    <>
      Most emerging businesses are focused on maintaining their bottom line costs while challenged with growing and
      optimizing their revenues with existing resources. The opportunity that technology and tooling provides is
      intended to unlock new efficiencies that manual process often cannot.
      <br />
      <br />
      Unfortunately, many small business implementing technologies fall short in realizing the business value that was
      initially driving their business case. The cost to continue developing the capability can become out of reach for
      many or uninspiring for others.
      <br />
      <br />
      We work with companies to cost effectively provide a fractional solution that takes care of optimizing your CRM
      technology and sales operations through partnership.
    </>
  ),
  typography: "body",
  style: {
    width: "672px",
  },
};

export const FooterStory = Template.bind({});
FooterStory.storyName = "Footer - Work Sans Regular";
FooterStory.args = {
  text: (
    <>
      About
      <br />
      CRM
      <br />
      Analytics
      <br />
      Blog
      <br />
      Contact
      <br />
      Terms &amp; Conditions
    </>
  ),
  color: "text-white",
  typography: "footer",
};
FooterStory.parameters = {
  backgrounds: { default: "dark" },
};

export const StatsStory = Template.bind({});
StatsStory.storyName = "Stats - Poppins Light";
StatsStory.args = {
  text: "100%",
  typography: "stats",
};
