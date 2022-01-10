const slugify = require("slugify");

const strToUrl = str => {
  return slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g });
};

exports.buildProjectUrl = project => {
  return `/projects/${strToUrl(project.projectName)}`;
};

exports.buildCityUrl = city => {
  return `/cities/${strToUrl(city.cityName)}`;
};

exports.buildDeveloperUrl = developer => {
  return `/developers/${strToUrl(developer.developerName)}`;
};
