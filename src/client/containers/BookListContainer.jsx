import { connect } from 'react-redux';
import BookActions from 'client/redux/actions/bookActions';
import { booksSelector, booksByIdSelector } from 'client/redux/selectors/bookSelectors';
import ModalActions from 'client/redux/actions/modalActions';

const mapStateToProps = state => ({
  booksbyId: booksByIdSelector(state),
  books: booksSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(BookActions.fetch()),
  createBook: isbn => dispatch(BookActions.create(isbn)),
  showPostingModal: bookId => dispatch(ModalActions.showPostingModal(bookId)),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
