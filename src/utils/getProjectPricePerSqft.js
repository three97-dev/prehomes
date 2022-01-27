const { calculatePricePerSquareFoot } = require("./calculatePricePerSquareFoot");

exports.getProjectPricePerSqft = projectFloors => {
  const sortedBySqft = projectFloors.sort((a, b) => {
    return a.squareFootage - b.squareFootage;
  });

  if (sortedBySqft.length > 0) {
    return calculatePricePerSquareFoot(sortedBySqft[0].price, sortedBySqft[0].squareFootage);
  }
  return 0;
};
