import { connect } from 'react-redux';
import SignInModalActions from 'client/redux/actions/signInModalActions';
import { signInModalSelector } from 'client/redux/selectors/modalSelectors';

const mapStateToProps = state => signInModalSelector(state);

const mapDispatchToProps = dispatch => ({
  showSignInModal: () => dispatch(SignInModalActions.showModal()),
  hideSignInModal: () => dispatch(SignInModalActions.hideModal()),
  changeSignInMode: mode => dispatch(SignInModalActions.changeModalMode(mode)),
});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
