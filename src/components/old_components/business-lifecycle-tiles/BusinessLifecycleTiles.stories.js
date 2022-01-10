import React from "react";

import ImageBusinessLifecycleTileOne from "/src/assets/pages/home/business-lifecycle-customer-type-1.svg";
import ImageBusinessLifecycleTileTwo from "/src/assets/pages/home/business-lifecycle-customer-type-2.svg";
import ImageBusinessLifecycleTileThree from "/src/assets/pages/home/business-lifecycle-customer-type-3.svg";
import ImageBusinessLifecycleTileFour from "/src/assets/pages/home/business-lifecycle-customer-type-4.svg";

import BusinessLifecycleTiles from "./BusinessLifecycleTiles";

export default {
  title: "Home/Business lifecycle tiles",
  component: BusinessLifecycleTiles,
};

export const Default = args => <BusinessLifecycleTiles {...args} />;
Default.args = {
  title: "Let’s see where your CRM situation lines up today.",
  subtitle: "Click the area below that best represents where your business is in its lifecycle to learn more.",
  tileOneImage: {
    mock: ImageBusinessLifecycleTileOne,
  },
  blockTitle1: "WE’RE LOOKING TO IMPLEMENT OUR FIRST CRM.",
  blockContent1:
    "If this is your first time implementing a CRM, we’ll make it simple and walk you through your options.",
  tileTwoImage: {
    mock: ImageBusinessLifecycleTileTwo,
  },
  blockTitle2: "WE’RE LOOKING TO SWITCH FROM OUR CURRENT CRM.",
  blockContent2:
    "If your toolset is underpowered or you’ve outgrown its purpose, we can introduce you to new capabilities.",
  tileThreeImage: {
    mock: ImageBusinessLifecycleTileThree,
  },
  blockTitle3: "WE NEED HELP MANAGING DYNAMICS 365",
  blockContent3: "If you’re already using Dynamics 365, let us help you unlock its full potential.",
  tileFourImage: {
    mock: ImageBusinessLifecycleTileFour,
  },
  blockTitle4: "WE NEED HELP WITH REPORTING AND ANALYTICS.",
  blockContent4: "Turn your data into insights with in-depth reporting and analytics.",
  homeSmthElse: "We’re probably something else...",
  homeSmthButtonLink: "/test",
};
