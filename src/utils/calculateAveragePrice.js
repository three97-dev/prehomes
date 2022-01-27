exports.calculateAveragePrice = arr => {
  if (arr.length > 0) {
    const average = arr.reduce((a, b) => a + b, 0) / arr.length;
    return Math.round(average / 10) * 10;
  }
  return 0;
};
