const passport = require('passport');
require('./passport')(passport);

const authenticate = passport.authenticate('jwt', { session: false });

const getToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return null;
};

const ensureAuthenticated = (req, res, next) => {
  const token = getToken(req.headers);
  if (token) {
    next();
  } else {
    res.status(403).send({ success: false, msg: 'Unauthorized' });
  }
};

module.exports = {
  authenticate,
  ensureAuthenticated,
};
