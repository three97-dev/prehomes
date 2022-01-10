import React from "react";

import ContactUsBlog from "./ContactUsBlog";

export default {
  title: "Blog/Contact Us Blog",
  component: ContactUsBlog,
};

const Template = args => <ContactUsBlog {...args} />;

export const Default = Template.bind({});
Default.args = {
  link: "/",
  title: "Contact Us",
  subtitle: "Looking for more? Get in touch with us if you have a topic to suggest for our blog.",
  linkLabel: "Let’s Talk",
};
