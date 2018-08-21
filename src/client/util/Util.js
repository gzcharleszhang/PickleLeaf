// eslint-disable-next-line import/prefer-default-export
export const makeConstantsObject = (obj) => {
  // eslint-disable-next-line no-param-reassign
  Object.keys(obj).forEach((e) => { obj[e] = e; });
};
