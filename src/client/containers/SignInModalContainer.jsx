import { connect } from 'react-redux';
import SignInModalActions from 'client/redux/actions/signInModalActions';
import UserActions from 'client/redux/actions/userActions';
import { signInModalSelector } from 'client/redux/selectors/modalSelectors';

const mapStateToProps = state => signInModalSelector(state);

const mapDispatchToProps = dispatch => ({
  showSignInModal: () => dispatch(SignInModalActions.showModal()),
  hideSignInModal: () => dispatch(SignInModalActions.hideModal()),
  changeSignInMode: mode => dispatch(SignInModalActions.changeModalMode(mode)),
  register: user => dispatch(UserActions.register(user)),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
