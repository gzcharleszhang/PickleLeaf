import { makeConstantsObject } from 'client/util/Util';

const ActionTypes = {
  REGISTER_SUCCESS: '',
  REGISTER_REQ: '',
  REGISTER_ERR: '',
};

makeConstantsObject(ActionTypes);
export default ActionTypes;
