// eslint-disable-next-line import/prefer-default-export
export const makeConstantsObject = (obj) => {
  // eslint-disable-next-line no-param-reassign
  Object.keys(obj).forEach((e) => { obj[e] = e; });
};

export const makeIdMap = (arr) => {
  const map = {};
  arr.forEach((item) => {
    if (item && item._id) {
      map[item._id] = item;
    }
  });
  return map;
};
