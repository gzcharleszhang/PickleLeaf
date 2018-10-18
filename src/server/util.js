const passport = require('passport');
require('./passport')(passport);
const { ServerError } = require('./error');

const authenticate = passport.authenticate('jwt', { session: false });

/**
 * Validates whether or not the given price is within
 * range and a valid number
 */
const validatePrice = (price) => {
  const parsedPrice = Number.parseFloat(price);
  const returnVal = {
    parsedPrice,
    error: null,
  };
  if (Number.isNaN(parsedPrice)) {
    returnVal.error = new ServerError('Price is not valid');
  } else if (parsedPrice > 10000 || parsedPrice < 0) {
    returnVal.error = new ServerError('Price must be between 0 and 10000');
  }
  return returnVal;
};

const FAKE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfY3JlYXRlZE9uIjoiMjAxOC0wOC0zMFQxOTozOTowMS4yNTlaIiwiX3R5cGUiOiJVc2VyIiwiX2lkIjoiNWI4ODQ5YjE5MWRlZmMxYmY4OTNlZWZiIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUjNTbEFVLlJPb3JQaG13ZGdGUkVhdUJhMmNKdTFCU3NycUE2NlF6Mkl1QlVNSVE5cVpFamkiLCJmaXJzdE5hbWUiOiJDaGFybGVzIiwibGFzdE5hbWUiOiJaaGFuZyIsIm5hbWUiOiJDaGFybGVzIFpoYW5nIiwiX192IjowLCJpYXQiOjE1Mzk3NDgyMDd9.uzjPy62jCx4y_pei56hH87DSIR7vY68zuSHwNnIUnl8';

module.exports = {
  authenticate,
  validatePrice,
  FAKE_TOKEN,
};
