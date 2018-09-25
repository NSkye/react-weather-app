const defaultState = {
  fetchRequests: { }
};

export function fetchReducer(state = defaultState, action) {
  const newState = {
    fetchRequests: { ...state.fetchRequests }
  };

  switch (action.type) {
    case 'REGISTER REQUEST':
      newState.fetchRequests[action.key] = action.controller;
      break;
    case 'ABORT REQUEST':
      if (!newState.fetchRequests[action.key]) { break; }
      newState.fetchRequests[action.key].abort();
      delete newState.fetchRequests[action.key];
      break;
    default:
      break;
  }

  return newState;
}