import { connect } from 'react-redux';
import PostingActions from 'client/redux/actions/postingActions';
import { postingsSelector } from 'client/redux/selectors/postingSelectors';

const mapStateToProps = state => postingModalSelector(state);

const mapDispatchToProps = dispatch => ({
  showPostingModal: bookId => dispatch(showPostingModal(bookId)),
  hidePostingModal: () => dispatch(hidePostingModal()),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
