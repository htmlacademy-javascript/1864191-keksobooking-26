const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 5) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomList = (array) =>  {
  const result = [];
  const times = getRandomPositiveInteger(1, array.length - 1);

  for (let i = 0; i < times; i++) {
    result.push(array[getRandomPositiveInteger(0, array.length - 1)]);
  }
  return [...new Set(result)];
};

export {getRandomArrayElement, getRandomList, getRandomPositiveFloat, getRandomPositiveInteger};
