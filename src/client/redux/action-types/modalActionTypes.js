import { makeConstantsObject } from 'client/util/Util';

const ActionTypes = {
  SHOW_SIGN_IN_MODAL: '',
  HIDE_SIGN_IN_MODAL: '',
  CHANGE_SIGN_IN_MODAL_MODE: '',
  SHOW_POSTING_MODAL: '',
  HIDE_POSTING_MODAL: '',
};

makeConstantsObject(ActionTypes);
export default ActionTypes;
