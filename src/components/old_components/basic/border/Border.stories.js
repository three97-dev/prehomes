import React from "react";

import Border from "./Border";

export default {
  title: "Basic/Border",
  component: Border,
  argTypes: {
    className: "py-20px",
    borderSide: {
      options: ["right", "left", "top", "bottom"],
      control: { type: "radio" },
    },
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Default = args => (
  <div
    style={{
      display: "grid",
      position: "relative",
      width: "300px",
      height: "300px",
      margin: "20px",
      border: "1px solid white",
      gridTemplateAreas: "'. . .' '. area1 .' '. . .'",
      gridTemplateColumns: "50px 200px 50px",
      gridTemplateRows: "50px 200px 50px",
    }}
  >
    <div
      style={{
        gridArea: "area1",
        width: "200px",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      some content
    </div>
    <Border {...args} style={{ gridArea: "area1" }} />
  </div>
);

Default.args = {
  className: "py-20px",
  borderSide: "right",
};
