const { PostingModel, DeletedPostingModel } = require('../models/posting');
const { ServerError } = require('../error');
const { validatePrice } = require('../util');

module.exports = {
  fetch: (req, res, next) => {
    PostingModel.find({})
      .then((postings) => {
        res.json({ postings, success: true });
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
    const { parsedPrice, error } = validatePrice(price);
    if (error) {
      next(error);
    }
    // create and save posting
    const newPosting = new PostingModel({
      userId,
      bookId,
      description,
      price: parsedPrice,
    });
    newPosting.save()
      .then(posting => res.json({ posting, success: true }))
      .catch(() => next(new ServerError('Cannot create posting')));
  },

  update: (req, res, next) => {
    const { postingId } = req.params;
    const { price, description } = req.body;
    if (!postingId) {
      next(new ServerError('Missing posting id'));
    }

    PostingModel.findById(postingId)
      .then((oldPosting) => {
        // validate price if new price was given
        if (price) {
          const { parsedPrice, error } = validatePrice(price);
          if (error) {
            next(error);
          }
          oldPosting.set({ price: parsedPrice });
        }
        oldPosting.set({ description });
        return oldPosting.save();
      })
      .then(newPosting => res.json({ posting: newPosting, success: true }))
      .catch(err => next(new ServerError(err.toString())));
  },

  delete: (req, res, next) => {
    const { postingId } = req.params;
    if (!postingId) {
      next(new ServerError('Missing posting id'));
    }

    PostingModel.findById(postingId)
      .then((posting) => {
        const deletedPosting = new DeletedPostingModel(posting);
        return deletedPosting.save();
      })
      .then(PostingModel.findByIdAndRemove(postingId))
      .then(posting => res.json({ posting, success: true }))
      .catch(err => next(new ServerError(err.toString())));
  },
};