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

userSchema.pre('save', (next) => {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        next(err);
        return;
      }
      bcrypt.hash(user.password, salt, null, (e, hash) => {
        if (e) {
          next(e);
          return;
        }
        user.password = hash;
        next();
      });
    });
  }
});

userSchema.methods.comparePassword = password => new Promise(
  (resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        reject(err);
      }
      resolve(isMatch);
    });
  });


const UserModel = mongoose.model('User', userSchema);

module.exports = {
  UserModel,
};
