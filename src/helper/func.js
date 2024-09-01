export const fix2 = (param, pow = 2) =>
  Math.round(param * Math.pow(10, pow)) / Math.pow(10, pow);

export const selectLastItems = (arr, count) => {
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

export const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};

  for (const [key, value] of params.entries()) {
    if (key === "user") {
      result[key] = JSON.parse(decodeURIComponent(value));
    } else {
      result[key] = decodeURIComponent(value);
    }
  }

  return result;
};
