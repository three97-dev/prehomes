import React from "react";

import ContactsMap from "./ContactsMap";

export default {
  title: "Contact/Contacts Map",
  component: ContactsMap,
};

const Template = args => <ContactsMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "We’re your local CRM spot.",
  address: "Address:",
  addressContent: "200-1460 Chevrier Blvd., Winnipeg, MB R3T 1Y6 Canada",
  phone: "Phone:",
  phoneContent: "204-202-5759",
  email: "Email:",
  emailContent: "sales@amplify-solutions.ca",
};
