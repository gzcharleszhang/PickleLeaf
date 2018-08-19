const apiCall = ({ dispatch }) => next => (action) => {
  const {
    types,
    callAPI,
    ...props
  } = action;

  if (!types || types.length === 0) {
    return next(action);
  }
  const [request, success, failure] = types;

  dispatch({
    ...props,
    type: request,
  });

  return callAPI().then((res) => {
    dispatch({
      ...props,
      type: success,
      data: res.data,
    });
  }).catch((err) => {
    dispatch({
      ...props,
      type: failure,
      err,
    });
  });
};

export default apiCall;