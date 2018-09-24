import { connect } from 'react-redux';
import BookActions from 'client/redux/actions/bookActions';
import UserActions from 'client/redux/actions/userActions';
import PostingActions from 'client/redux/actions/postingActions';

const mapStateToProps = state => ({
  isLoading: state.books.isLoading
    || state.users.isLoading
    || state.postings.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(BookActions.fetch()),
  fetchUsers: () => dispatch(UserActions.fetch()),
  fetchPostings: () => dispatch(PostingActions.fetch()),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
