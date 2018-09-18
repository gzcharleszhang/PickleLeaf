import { booksByIdSelector } from 'client/redux/selectors/bookSelectors';

export const signInModalSelector = state => ({
  isSignInModalVisible: state.modals.isSignInModalVisible,
  signInModalMode: state.modals.signInModalMode,
});

export const postingModalSelector = (state) => {
  const booksById = booksByIdSelector(state);
  return {
    isPostingModalVisible: state.modals.isPostingModalVisible,
    bookId: state.modals.bookId,
    book: booksById[state.modals.bookId],
  };
};