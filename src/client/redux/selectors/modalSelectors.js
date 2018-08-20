// eslint-disable-next-line import/prefer-default-export
export const signInModalSelector = state => ({
  isSignInModalVisible: state.signInModal.isVisible,
  signInModalMode: state.signInModal.mode,
});