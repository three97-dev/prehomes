const slugify = require("slugify");

const strToUrl = (str, fallback) => {
  let slug = slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g, strict: true });
  if (slug === "") {
    return fallback;
  }
  return slug;
};

exports.buildProjectUrl = project => {
  return `/projects/${strToUrl(project.projectName, project.contentful_id)}`;
};

exports.buildCityUrl = city => {
  return `/cities/${strToUrl(city.cityName, city.contentful_id)}`;
};

exports.buildDeveloperUrl = developer => {
  return `/developers/${strToUrl(developer.developerName, developer.contentful_id)}`;
};

exports.buildProjectTypeUrl = projectType => {
  return `/project-type/${strToUrl(projectType.name, projectType.contentful_id)}`;
};
