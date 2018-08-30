const isIsbn10 = isbn => isbn && isbn.length === 10;

const isIsbn13 = isbn => isbn && isbn.length === 13 && isbn.startsWith('978');

const convertToIsbn13 = (isbn) => {
  const nine = `${isbn.substr(0, 9)}`;
  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    const num = parseInt(nine[i], 10);
    if (i % 2 === 0) {
      // even
      sum += num;
    } else {
      sum += num * 3;
    }
  }
  sum %= 10;
  const lastDigit = sum === 0 ? 0 : 10 - sum;
  return `978${nine}${lastDigit}`;
};

module.exports = {
  isIsbn10,
  isIsbn13,
  convertToIsbn13,
};
