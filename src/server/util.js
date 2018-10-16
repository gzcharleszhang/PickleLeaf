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

module.exports = {
  authenticate,
  validatePrice,
};
