import { connect } from 'react-redux';
import ModalActions from 'client/redux/actions/modalActions';
import { postingModalSelector } from 'client/redux/selectors/modalSelectors';

const mapStateToProps = state => postingModalSelector(state);

const mapDispatchToProps = dispatch => ({
  showPostingModal: bookId => dispatch(ModalActions.showPostingModal(bookId)),
  hidePostingModal: () => dispatch(ModalActions.hidePostingModal()),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
