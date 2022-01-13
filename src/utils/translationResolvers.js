const STATUSES = {
  "sold-out": "Sold out",
  "newest-releases": "Newest releases",
  "launching-soon": "Launching soon",
};

export const statusResolver = status => {
  return STATUSES[status];
};
