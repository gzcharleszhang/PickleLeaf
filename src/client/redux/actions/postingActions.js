import ActionTypes from 'client/redux/action-types/postingActionTypes';
import apiRequest from 'client/util/ApiRequest';

const PostingActions = {
  create: posting => ({
    types: [
      ActionTypes.POSTING_CREATE_REQ,
      ActionTypes.POSTING_CREATE_OK,
      ActionTypes.POSTING_CREATE_ERR,
    ],
    payload: { posting },
    callAPI: () => apiRequest.post('/postings', posting),
  }),
  fetch: () => ({
    types: [
      ActionTypes.POSTING_FETCH_REQ,
      ActionTypes.POSTING_FETCH_OK,
      ActionTypes.POSTING_FETCH_ERR,
    ],
    payload: {},
    callAPI: () => apiRequest.get('/postings'),
  }),
};

export default PostingActions;
