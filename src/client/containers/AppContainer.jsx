import { connect } from 'react-redux';
import BookActions from 'client/redux/actions/bookActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(BookActions.fetch()),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
