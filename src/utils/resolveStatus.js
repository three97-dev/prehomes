const { DateTime } = require("luxon");

exports.resolveStatus = date => {
  if (!date) {
    return "planning";
  }

  const launchDate = DateTime.fromISO(date).startOf("day");
  const threeWeeksAfterLaunch = launchDate.plus({ days: 21 }).startOf("day");
  const dateNow = DateTime.now().startOf("day");

  if (dateNow < launchDate) {
    return "launching-soon";
  } else if (launchDate <= dateNow && dateNow <= threeWeeksAfterLaunch) {
    return "platinum-access";
  } else if (threeWeeksAfterLaunch < dateNow) {
    return "selling";
  }
};
