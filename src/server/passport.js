const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { UserModel } = require('./models/user');
const settings = require('./settings');

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = settings.secret;
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    UserModel.findOne({ _id: jwtPayload._id }, (err, user) => {
      if (err) {
        done(err, false);
        return;
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
