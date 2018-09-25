const defaultState = {
  open: true
};

export function sideBarReducer(state=defaultState, action) {
  const newState = {...state};
  
  if (action.type == 'TOGGLE_SIDEBAR') {
    newState.open = !newState.open;
  }

  return newState;
}

export const selectSideBarState = state => state.sideBarReducer.open;