// eslint-disable-next-line import/prefer-default-export
export const signInModalSelector = state => ({
  isSignInModalVisible: state.modals.isSignInModalVisible,
  signInModalMode: state.modals.signInModalMode,
});

export const newPostingModalSelector = state => ({
  isNewPostingModalVisiblbe: state.modals.isNewPostingModalVisible,
});