import React from "react";

import ContactUsBlogPost from "./ContactUsBlogPost";

export default {
  title: "Blog/Contact Us Blog Post",
  component: ContactUsBlogPost,
};

const Template = args => <ContactUsBlogPost {...args} />;

export const Default = Template.bind({});
Default.args = {
  link: "/",
  title: "Contact Us",
  subtitle: "Like what you’re seeing? Get in touch with us so we can talk about amplifying your business.",
  linkLabel: "Let’s Connect",
};
