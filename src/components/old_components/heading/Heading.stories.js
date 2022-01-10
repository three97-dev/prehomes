import React from "react";

import Heading from "./Heading";

export default {
  title: "Common/Heading",
  component: Heading,
  argTypes: {
    color: {
      options: ["blue", "red"],
      control: { type: "radio" },
    },
    direction: {
      options: ["left", "right"],
      control: { type: "radio" },
    },
  },
};

const Template = args => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Some Text",
  link: "/test",
};


export const HomeRightRed = Template.bind({});
HomeRightRed.args = {
  direction: "right",
  color: "red",
  text: "We also help non-profits.",
  link: "/test",
};

export const HomeLeftBlue = Template.bind({});
HomeLeftBlue.args = {
  text: "Are you ready to connect?",
  link: "/test",
};