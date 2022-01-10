import React from "react";

import AboutUs from "./AboutUs";

export default {
  title: "About/About Us",
  component: AboutUs,
};

const Template = args => <AboutUs {...args} />;

export const Default = Template.bind({});
Default.args = {
  mainText:
    "Since 2018, we’ve been working with businesses of all sizes to amplify their sales, margins and satisfaction through the use of customized CRM and business intelligence solutions.",
  secondaryText:
    "Our focus is to partner with organizations to simplify the process of setting up and maximizing the potential of Dynamics 365 and Power BI. We build high-end systems and analytics that result in a major competitive advantage for our clients.",
  tile1Title: "MISSION",
  tile1Description: "Tailored business technology, made simple and attainable.",
  tile2Title: "VISION",
  tile2Description:
    "Driving profitability and scalability through the effective implementation and management of technology.",
};
