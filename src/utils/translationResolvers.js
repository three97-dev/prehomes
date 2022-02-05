const STATUSES = {
  "platinum-access": "Platinum Access",
  "launching-soon": "Launching soon",
  planning: "Planning",
  selling: "Selling",
};

export const statusResolver = status => {
  return STATUSES[status];
};
