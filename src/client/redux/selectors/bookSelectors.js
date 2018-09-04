import { createSelector } from 'reselect';

export const booksByIdSelector = state => state.books.booksById;

export const booksSelector = createSelector(
  booksByIdSelector,
  booksById => Object.values(booksById),
);