import React from "react";

import ThankYouForSubmission from "./ThankYouForSubmission";

export default {
  title: "Home/Thank You For Submission",
  component: ThankYouForSubmission,
};

export const Default = args => (
  <div style={{ margin: "20px", display: "flex" }}>
    <ThankYouForSubmission {...args} />;
  </div>
);

Default.args = {
  color: "type3",
  title: "Thank you for your submission!",
  content: "We appreciate your consideration. We will be in touch as soon as we can.",
};
