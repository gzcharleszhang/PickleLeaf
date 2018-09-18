import { connect } from 'react-redux';
import BookActions from 'client/redux/actions/bookActions';
import UserActions from 'client/redux/actions/userActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(BookActions.fetch()),
  fetchUsers: () => dispatch(UserActions.fetch()),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
