export const fix2 = (param, pow = 2) =>
  Math.round(param * Math.pow(10, pow)) / Math.pow(10, pow);

export const selectLastItems = (arr, count) => {
  // If the array length is less than the count, return the entire array
  if (arr.length <= count) {
    return arr;
  }
  return arr.slice(-count);
};

export const getAverage = (array) => {
  if (array.length === 0) return 0;
  const sum = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum / array.length;
};
