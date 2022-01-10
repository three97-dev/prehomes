import React from "react";

import AdvantagesOfCRM from "./AdvantagesOfCRM";

import AdvantagesMessagingImage from "../../../assets/old_assets/pages/crm/advantages-messaging.svg";
import AdvantagesEfficiencyImage from "../../../assets/old_assets/pages/crm/advantages-efficiency.svg";
import AdvantagesCollaborationImage from "../../../assets/old_assets/pages/crm/advantages-collaboration.svg";
import AdvantagesManagementImage from "../../../assets/old_assets/pages/crm/advantages-management.svg";
import AdvantagesReportingImage from "../../../assets/old_assets/pages/crm/advantages-reporting.svg";
import AdvantagesDashboardsImage from "../../../assets/old_assets/pages/crm/advantages-dashboards.svg";

export default {
  title: "CRM/Advantages Of CRM",
  component: AdvantagesOfCRM,
};

const Template = args => <AdvantagesOfCRM {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Advantages of Having a Strong CRM",
  advantages1Image: {
    mock: AdvantagesMessagingImage,
  },
  advantages1Title: "IMPROVED MESSAGING",
  advantages1Content: "Reach consistency and avoid missed follow-ups by centralizing your communication.",

  advantages2Image: {
    mock: AdvantagesEfficiencyImage,
  },
  advantages2Title: "EFFICIENCY BY AUTOMATION",
  advantages2Content:
    "Build you company specific processes to help automate notifications, task assignment, approvals, administrative work, and document creation.",

  advantages3Image: {
    mock: AdvantagesCollaborationImage,
  },
  advantages3Title: "SIMPLIFIED COLLABORATION",
  advantages3Content:
    "A central system for Sales, Service, Marketing, Operations and Management to streamline your inter-department collaboration and work.",

  advantages4Image: {
    mock: AdvantagesManagementImage,
  },
  advantages4Title: "PROACTIVE CUSTOMER MANAGEMENT",
  advantages4Content:
    "Begin to segment and group your Prospects and Clients, allowing for system checks and notifications to help proactively manage your relationships.",

  advantages5Image: {
    mock: AdvantagesReportingImage,
  },
  advantages5Title: "TRUSTWORTHY REPORTING",
  advantages5Content:
    "Through your custom processes and required fields you can begin to build valuable and accurate data on your business.",

  advantages6Image: {
    mock: AdvantagesDashboardsImage,
  },
  advantages6Title: "DASHBOARDS FOR DATA SHOWCASING",
  advantages6Content:
    "Leverage your company data to build in-depth reporting for better business insights and decisions.",
};
