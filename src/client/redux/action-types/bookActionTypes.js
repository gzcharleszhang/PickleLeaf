import { makeConstantsObject } from 'client/util/Util';

const ActionTypes = {
  CREATE_SUCCESS: '',
  CREATE_REQ: '',
  CREATE_ERR: '',
};

makeConstantsObject(ActionTypes);
export default ActionTypes;
