function getRandomIntInclusive (min, max) {
  const result = Math.round(Math.random() * (max - min + 1)) + min;
  const resultAlternative = Math.round(Math.random() * (min - max + 1)) + max;

  if (min < 0 || max < 0) {
    return 'Диапазон может быть только положительный, включая ноль.';
  }
  if (min >= max) {
    return resultAlternative;
  }
  return result;
}

getRandomIntInclusive(10, 100);

function getRandomFloat (min, max) {
  const result = Math.random() * (max - min + 1) + min;
  const resultAlternative = Math.random() * (min - max + 1) + max;

  if (min < 0 || max < 0) {
    return 'Диапазон может быть только положительный, включая ноль.';
  }
  if (min >= max) {
    return resultAlternative.toFixed(2);
  }
  return result.toFixed(2);
}

getRandomFloat(0, 50);
