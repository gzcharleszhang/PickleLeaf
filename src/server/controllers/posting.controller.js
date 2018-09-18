const { PostingModel } = require('../models/posting');
const { ServerError } = require('../error');

module.exports = {
  fetch: (req, res, next) => {
    PostingModel.find({})
      .then((postings) => {
        res.json(postings);
      })
      .catch(() => {
        next(new ServerError('Cannot find postings'));
      });
  },

  create: (req, res, next) => {
    const {
      userId, bookId, description, price,
    } = req.body;
    if (!userId) {
      next(new ServerError('Missing userId'));
    }
    if (!bookId) {
      next(new ServerError('Missing bookId'));
    }
    if (!price) {
      next(new ServerError('Missing price'));
    }
    const parsedPrice = Number.parseFloat(price);
    if (Number.isNaN(parsedPrice)) {
      next(new ServerError('Price is not valid'));
    } else if (parsedPrice > 10000 || parsedPrice < 0) {
      next(new ServerError('Price must be between 0 and 10000'));
    }
    const newPosting = new PostingModel({
      userId,
      bookId,
      description,
      price: parsedPrice,
    });
    newPosting.save()
      .then(posting => res.json(posting))
      .catch(() => next(new ServerError('Cannot create posting')));
  },
};