const mongoose = require('mongoose');

const { Schema } = mongoose;

const postingSchema = new Schema({
  userId: String,
  bookId: String,
  description: String,
  price: Number,
  buyerId: String,
  _createdOn: {
    type: Date,
    default: Date.now(),
  },
  _type: {
    type: String,
    default: 'Posting',
  },
});

const PostingModel = mongoose.model('Posting', postingSchema);
const DeletedPostingModel = mongoose.model('DeletedPosting', postingSchema);

module.exports = {
  PostingModel,
  DeletedPostingModel,
};
