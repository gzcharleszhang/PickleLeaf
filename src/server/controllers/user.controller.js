const passport = require('passport');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const settings = require('../settings');
const { UserModel } = require('../models/user');
require('../passport')(passport);


module.exports = {
  register: (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    if (!email || !password) {
      res.json({ success: false, msg: 'Missing email and password' });
    } else if (!firstName || !lastName) {
      res.json({ success: false, msg: 'Missing first and last name' });
    } else {
      const name = `${firstName} ${lastName}`;
      const newUser = new UserModel({
        _id: shortid.generate(),
        email,
        password,
        firstName,
        lastName,
        name,
      });
      newUser.save()
        .then(() => {
          res.json({ success: true, msg: 'Successfully created user' });
        })
        .catch((error) => {
          res.json({ ...error, success: false, msg: 'User already exists' });
        });
    }
  },

  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ success: false, msg: 'Missing email and password' });
    } else {
      UserModel.findOne({ email })
        .then((user) => {
          if (!user) {
            res.status(401).send({
              success: false,
              msg: 'Login failed, user not found',
            });
          } else {
            user.comparePassword(password)
              .then((isMatch) => {
                if (isMatch) {
                  const token = jwt.sign(user.toJSON(), settings.secret);
                  res.json({ success: true, token: `JWT ${token}` });
                } else {
                  res.status(401).send({
                    success: false,
                    msg: 'Authentication failed, wrong password',
                  });
                }
              })
              .catch((error) => {
                res.status(401).send({
                  ...error,
                  success: false,
                  msg: 'Authentication failed',
                });
              });
          }
        });
    }
  },
};
