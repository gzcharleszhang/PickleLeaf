import { createSelector } from 'reselect';
import { usersByIdSelector } from 'client/redux/selectors/userSelectors';
import { booksByIdSelector } from 'client/redux/selectors/bookSelectors';

export const postingsByIdSelector = state => state.postings.postingsById;

export const postingsSelector = createSelector(
  postingsByIdSelector,
  usersByIdSelector,
  booksByIdSelector,
  (postingsById, usersById, booksById) => Object.values(postingsById || {})
    .map(posting => ({
      ...posting,
      user: usersById[posting.userId],
      book: booksById[posting.bookId],
    })),
);

export const bookPostingsSelector = (state) => {
  const postings = postingsSelector(state);
  if (!state.modals.bookId) {
    return [];
  }
  return postings.filter(p => p.bookId === state.modals.bookId);
};
