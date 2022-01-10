import React from "react";

import Footer from "./Footer";

import LogoFooter from "../../../assets/old_assets/pages/footer/Logo-footer-mobile.svg";

export default {
  title: "Common/Footer",
  component: Footer,
};

const Template = args => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  logo: {
    mock: LogoFooter,
  },
  copyright: "Amplify © 2021 All Rights Reserved",
  address: "200-1460 Chevrier Blvd. Winnipeg, MB R3T 1Y6 Canada",
  links: [
    { link: "/", label: "About" },
    { link: "/", label: "CRM" },
    { link: "/", label: "Analytics" },
    { link: "/", label: "Blog" },
    { link: "/", label: "Contact" },
    { link: "/", label: "Terms & Conditions" },
  ],
};

export const MoreLinks = Template.bind({});
MoreLinks.args = {
  logo: {
    mock: LogoFooter,
  },
  copyright: "Amplify © 2021 All Rights Reserved",
  address: "200-1460 Chevrier Blvd. Winnipeg, MB R3T 1Y6 Canada",
  links: [
    { link: "/", label: "About" },
    { link: "/", label: "CRM" },
    { link: "/", label: "Analytics" },
    { link: "/", label: "Blog" },
    { link: "/", label: "Contact" },
    { link: "/", label: "Terms & Conditions" },
    { link: "/", label: "Analytics" },
    { link: "/", label: "Blog" },
    { link: "/", label: "Contact" },
  ],
};

export const LongerLinks = Template.bind({});
LongerLinks.args = {
  logo: {
    mock: LogoFooter,
  },
  copyright: "Amplify © 2021 All Rights Reserved",
  address: "200-1460 Chevrier Blvd. Winnipeg, MB R3T 1Y6 Canada",
  links: [
    { link: "/", label: "About;About" },
    { link: "/", label: "CRM;CRM" },
    { link: "/", label: "Analytics;Analytics" },
    { link: "/", label: "Blog;Blog" },
    { link: "/", label: "Contact;Contact" },
    { link: "/", label: "Terms & Conditions;Terms & Conditions" },
  ],
};
