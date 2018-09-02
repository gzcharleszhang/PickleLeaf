import { makeConstantsObject } from 'client/util/Util';

const ActionTypes = {
  BOOK_CREATE_OK: '',
  BOOK_CREATE_REQ: '',
  BOOK_CREATE_ERR: '',
  BOOK_FETCH_OK: '',
  BOOK_FETCH_REQ: '',
  BOOK_FETCH_ERR: '',
};

makeConstantsObject(ActionTypes);
export default ActionTypes;
