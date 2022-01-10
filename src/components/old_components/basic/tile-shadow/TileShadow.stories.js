import React from "react";

import TileShadow from "./TileShadow";

export default {
  title: "Basic/Tile Shadow",
  component: TileShadow,
  argTypes: {
    color: {
      options: ["type1", "type2", "type3", "type4", "type5", "type6"],
      control: { type: "select" },
    },
    hasContentBg: true,
    spacing: {
      options: ["10px", "20px"],
      control: { type: "radio" },
    },
  },
};

const Template = args => (
  <div style={{ margin: "50px", display: "flex" }}>
    <TileShadow {...args}>
      <div
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        some content
      </div>
    </TileShadow>
  </div>
);

export const Default = Template.bind({});

export const Color1 = Template.bind({});
Color1.args = {
  color: "type1",
  hasContentBg: true,
  spacing: "10px",
};

export const Color2 = Template.bind({});
Color2.args = {
  color: "type2",
  hasContentBg: true,
  spacing: "10px",
};

export const Color3 = Template.bind({});
Color3.args = {
  color: "type3",
  hasContentBg: true,
  spacing: "10px",
};

export const Color4 = Template.bind({});
Color4.args = {
  color: "type4",
  hasContentBg: true,
  spacing: "10px",
};

export const Color5 = Template.bind({});
Color5.args = {
  color: "type5",
  hasContentBg: true,
  spacing: "10px",
};

export const Color6 = Template.bind({});
Color6.args = {
  color: "type6",
  hasContentBg: true,
  spacing: "10px",
};
