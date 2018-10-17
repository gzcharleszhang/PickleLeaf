const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { UserModel } = require('./models/user');

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromHeader('jwt');
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    UserModel.findOne({ _id: jwtPayload._id }, (err, user) => {
      console.log(jwtPayload._id);
      if (err) {
        console.log(err);
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
