exports.calculatePricePerSquareFoot = (price, squareFootage) => {
  if (price && squareFootage) return Math.ceil(price / squareFootage / 10) * 10;
  return 0;
};
