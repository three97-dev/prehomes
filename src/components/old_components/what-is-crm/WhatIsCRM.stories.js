import React from "react";

import WhatIsCRM from "./WhatIsCRM";

export default {
  title: "CRM/What is CRM",
  component: WhatIsCRM,
};

export const Default = ({ ...args }) => <WhatIsCRM {...args} />;
Default.args = {
  title1: "What is customer relationship management?",
  subtitle1:
    "CRM is more than just software or a set of processes – it’s a business culture solidly focused on winning and keeping the right customers.",
  contentText1: (
    <>
      A good CRM solution builds value for your business by opening up vital communication channels and creating a
      common client-focused knowledge-base to better serve your clients. <br />
      <br />
      CRM has taken over as the largest software market in the world, with over 91% of companies with more than 11
      employees using a CRM system to manage their business and with good reason.A CRM system not only allows you to
      centralize and secure all your important business and customer data but can act as a singular business management
      tool that can propel your business to the next level.
    </>
  ),
  title2: "The Value Opportunity",
  subtitle2: "",
  contentText2:
    "CRM is more than just software or a set of processes – it’s a business culture solidly focused on winning and keeping the right customers. A good CRM solution builds value for your business by opening up vital communication channels and creating a common client-focused knowledge-base to better serve your clients",
};
