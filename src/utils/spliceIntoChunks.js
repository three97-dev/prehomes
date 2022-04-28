export const spliceIntoChunks = arr => {
  const filledArr = arr.concat(Array(16 - arr.length).fill(null));
  const res = [];

  while (filledArr.length > 0) {
    const chunk = filledArr.splice(0, 4);
    res.push(chunk);
  }

  return res;
};
