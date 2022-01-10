import React from "react";

import Input from "./Input";

export default {
  title: "Basic/Input",
  component: Input,
};

export const InputStory = () => <Input />;

export const InputLabelStory = args => <Input {...args} />;
InputLabelStory.args = {
  label: "E-Posta",
  placeholder: "isim@domain.com",
  className: "w-380px",
  color: "blue-gem",
};

export const InputErrorStory = args => <Input {...args} />;
InputErrorStory.args = {
  placeholder: "isim@domain.com",
  errorMessage: "This field is required*",
  isError: true,
  className: "w-full",
};
