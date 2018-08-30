import { connect } from 'react-redux';
import BookActions from 'client/redux/actions/bookActions';
import { newPostingModalSelector } from 'client/redux/selectors/modalSelectors';

const mapStateToProps = state => newPostingModalSelector(state);

const mapDispatchToProps = dispatch => ({
  createBook: isbn => dispatch(BookActions.create(isbn)),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
