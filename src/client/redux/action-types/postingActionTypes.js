import { makeConstantsObject } from 'client/util/Util';

const ActionTypes = {
  POSTING_CREATE_OK: '',
  POSTING_CREATE_REQ: '',
  POSTING_CREATE_ERR: '',
  POSTING_FETCH_OK: '',
  POSTING_FETCH_REQ: '',
  POSTING_FETCH_ERR: '',
};

makeConstantsObject(ActionTypes);
export default ActionTypes;
