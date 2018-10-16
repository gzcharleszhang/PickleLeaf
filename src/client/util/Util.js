/**
 * Set the values of the object equal to the key
 * e.g. { EXAMPLE: '' } => { EXAMPLE: 'EXAMPLE' }
 * @param {Object} obj
 */
export const makeConstantsObject = (obj) => {
  // eslint-disable-next-line no-param-reassign
  Object.keys(obj).forEach((e) => { obj[e] = e; });
};

/**
 * Convert an array of objects into a map where
 * the key is the _id of the object and the value
 * is the object itself.
 * @param {Array} arr array to be converted
 */
export const makeIdMap = (arr) => {
  const map = {};
  arr.forEach((item) => {
    if (item && item._id) {
      map[item._id] = item;
    }
  });
  return map;
};
