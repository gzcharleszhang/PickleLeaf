import { connect } from 'react-redux';
import ModalActions from 'client/redux/actions/modalActions';
import UserActions from 'client/redux/actions/userActions';
import { signInModalSelector } from 'client/redux/selectors/modalSelectors';

const mapStateToProps = state => signInModalSelector(state);

const mapDispatchToProps = dispatch => ({
  showSignInModal: () => dispatch(ModalActions.showModal()),
  hideSignInModal: () => dispatch(ModalActions.hideModal()),
  changeSignInMode: mode => dispatch(ModalActions.changeModalMode(mode)),
  register: user => dispatch(UserActions.register(user)),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
