const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  _createdOn: {
    type: Date,
    default: Date.now(),
  },
  _type: String,
});

// eslint-disable-next-line
userSchema.pre('save', function (next) {
  console.log(this);
  if (this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        next(err);
        return;
      }
      bcrypt.hash(this.password, salt, null, (e, hash) => {
        if (e) {
          next(e);
          return;
        }
        this.password = hash;
        next();
      });
    });
  }
});

// eslint-disable-next-line
userSchema.methods.comparePassword = function (password) {
  return new Promise(
    (resolve, reject) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          reject(err);
        }
        resolve(isMatch);
      });
    });
};


const UserModel = mongoose.model('User', userSchema);

module.exports = {
  UserModel,
};
