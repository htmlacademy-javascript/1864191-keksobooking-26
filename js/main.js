function getRandomIntInclusive (min, max) {
  let result = Math.round(Math.random() * (max - min + 1)) + min;
  let resultAlternative = Math.round(Math.random() * (min - max + 1)) + max;

  return (min < 0 || max < 0)
  ? 'Диапазон может быть только положительный, включая ноль.'
  : (min >= max)
    ? resultAlternative
    : result;
}

getRandomIntInclusive(10, 100);

function getRandomFloat (min, max) {
  let result = Math.random() * (max - min + 1) + min;
  let resultAlternative = Math.random() * (min - max + 1) + max;
  return (min < 0 || max < 0)
  ? 'Диапазон может быть только положительный, включая ноль.'
  : (min >= max)
    ? resultAlternative.toFixed(2)
    : result.toFixed(2);
}

getRandomFloat(0, 50);
