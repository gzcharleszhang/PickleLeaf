const passport = require('passport');
require('./passport')(passport);

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = {
  authenticate,
};
