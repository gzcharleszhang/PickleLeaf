import { makeConstantsObject } from 'client/util/Util';

const ActionTypes = {
  REGISTER_SUCCESS: '',
  REGISTER_REQ: '',
  REGISTER_ERR: '',
  USER_FETCH_REQ: '',
  USER_FETCH_OK: '',
  USER_FETCH_ERR: '',
};

makeConstantsObject(ActionTypes);
export default ActionTypes;
