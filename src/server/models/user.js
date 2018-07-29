const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  userName: String,
  email: String,
  password: String,
  _createdOn: Date,
  _type: String,
});

const userModel = mongoose.model('Expense', userSchema);

module.exports = {
  userModel,
}
