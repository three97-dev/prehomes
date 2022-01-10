import React from "react";

import AnalyticsFeatures from "./AnalyticsFeatures";

export default {
  title: "Analytics/AnalyticsFeatures",
  component: AnalyticsFeatures,
};

const Template = args => <AnalyticsFeatures {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Analytics provides the ability to be pro-active about your business activities.",
  subtitle: "Power BI helps to…",
  feature1Title: "CONNECT TO MULTIPLE DATABASES",
  feature1Content: "Bring your sales, marketing, service and accounting data together to create centralized reporting.",
  feature2Title: "SET SCHEDULE REFRESH DATE/ TIMES",
  feature2Content:
    "Set scheduled refresh dates and times, eliminating outdated information, manual updates and static excel reports",
  feature3Title: "POWERFUL VISUALIZATIONS FOR BUSINESS INSIGHTS",
  feature3Content:
    "Easily compare month-over-month or year-over-year sales performance, operational efficiency, financial performance and other important KPI’s.",
  feature4Title: "REDUCE “ONE-OFF” AND STATIC EXCEL REPORTS",
  feature4Content:
    "Connect directly to your raw data source to limit time spent on updating and reconciling your reports.",
  feature5Title: "SET PERMISSIONS AND SECURITIES TO SCALE REPORTS",
  feature5Content: "Create scalable reports with user/ role/department specific permissions.",
  feature6Title: "POWERFUL DRILLDOWNS FOR BUSINESS INSIGHTS",
  feature6Content:
    "Drill down on reports to investigate the cause of trends or variations in both performance and underperformance.",
};
