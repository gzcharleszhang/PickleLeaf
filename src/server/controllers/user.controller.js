const passport = require('passport');
const jwt = require('jsonwebtoken');
const { ServerError } = require('../error');
const settings = require('../settings');
const { UserModel } = require('../models/user');
require('../passport')(passport);


module.exports = {
  register: (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    if (!email || !password) {
      next(new ServerError('Missing email and password'));
    } else if (!firstName || !lastName) {
      next(new ServerError('Missing first name and last name'));
    } else {
      const name = `${firstName} ${lastName}`;
      const newUser = new UserModel({
        email,
        password,
        firstName,
        lastName,
        name,
      });
      newUser.save()
        .then((user) => {
          res.json({
            _id: user._id,
            firstName,
            lastName,
            name,
            email,
          });
        })
        .catch(() => {
          next(new ServerError('User already exists'));
        });
    }
  },

  login: (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ success: false, msg: 'Missing email and password' });
    } else {
      UserModel.findOne({ email })
        .then((user) => {
          if (!user) {
            next(new ServerError('email does not exist', 401));
          } else {
            user.comparePassword(password)
              .then((isMatch) => {
                if (isMatch) {
                  const token = jwt.sign(user.toJSON(), settings.secret);
                  res.json({
                    _id: user._id,
                    loginTime: Date.now(),
                    token,
                    name: user.name,
                  });
                } else {
                  next(new ServerError('Authentication failed, incorrect password', 401));
                }
              })
              .catch(() => {
                next(new ServerError('Authentication failed, incorrect password'));
              });
          }
        });
    }
  },

  checkDuplicateEmail: (req, res, next) => {
    const { email } = req.params;
    if (!email) {
      next(new ServerError('Missing email'));
    }

    UserModel.findOne({ email })
      .then((user) => {
        if (!user) {
          res.json({ success: true, msg: 'Email does not exist' });
        } else {
          res.json({ success: false, msg: 'Email already exists' });
        }
      });
  },
};
