import React from "react";

import Button from "./Button";

export default {
  title: "Basic/Button",
  component: Button,
};

const Template = args => (
  <div style={{ margin: "20px" }}>
    <Button {...args} />
  </div>
);

const TemplateAllSizes = args => (
  <>
    <Template {...args} style={{ width: "318px" }} />
    <Template {...args} style={{ width: "327px" }} />
    <Template {...args} style={{ width: "352px" }} />
    <Template {...args} style={{ width: "536px" }} />
  </>
);

const TemplateFluid = args => (
  <div style={{ margin: "20px", maxWidth: "536px" }}>
    <Button {...args} className="w-full" />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Just a Button",
};

export const HomeSmthElse = TemplateAllSizes.bind({});
HomeSmthElse.storyName = "Home - 'something else...'";
HomeSmthElse.args = {
  label: "We’re probably something else...",
};

export const HomeSmthElseFluid = TemplateFluid.bind({});
HomeSmthElseFluid.storyName = "Home - 'something else...' (fluid)";
HomeSmthElseFluid.args = {
  label: "We’re probably something else...",
};

export const HomeLearnMore = TemplateAllSizes.bind({});
HomeLearnMore.storyName = "Home - 'Learn more'";
HomeLearnMore.args = {
  label: "Learn more",
};

export const HomeLearnMoreFluid = TemplateFluid.bind({});
HomeLearnMoreFluid.storyName = "Home - 'Learn more' (fluid)";
HomeLearnMoreFluid.args = {
  label: "Learn more",
};

export const ContactsSubmit = args => (
  <>
    <Template {...args} style={{ width: "318px" }} />
    <Template {...args} style={{ width: "329px" }} />
    <Template {...args} style={{ width: "360px" }} />
    <Template {...args} style={{ width: "260px" }} />
  </>
);
ContactsSubmit.storyName = "Contacts - 'Submit'";
ContactsSubmit.args = {
  label: "Submit",
};

export const ContactsSubmitFluid = TemplateFluid.bind({});
ContactsSubmitFluid.storyName = "Contacts - 'Submit' (fluid)";
ContactsSubmitFluid.args = {
  label: "Submit",
};

export const BlogPostBack = args => (
  <>
    <Template {...args} style={{ width: "318px" }} />
    <Template {...args} style={{ width: "328px" }} />
    <Template {...args} style={{ width: "352px" }} />
    <Template {...args} style={{ width: "536px" }} />
  </>
);
BlogPostBack.storyName = "Blog Post - 'Back'";
BlogPostBack.args = {
  label: "Back to Blogs",
};

export const BlogPostBackFluid = TemplateFluid.bind({});
BlogPostBackFluid.storyName = "Blog Post - 'Back' (fluid)";
BlogPostBackFluid.args = {
  label: "Back to Blogs",
};
