const defaultState = {
  map: {
    coordinates: [55.76, 37.64],
    zoom: 3,
    selectLocation: false
  },
  sidebar: {
    open: false
  },
  locations: {
    loaded: false,
    list: []
  }
};

const reducer = (state = defaultState, action) => {
  const newState = { ...state };

  switch (action.type) {
  case 'CHANGE_COORDINATES':
    newState.map = {
      ...newState.map,
      coordinates: action.value
    };
    break;
  case 'TOGGLE_SELECT_LOCATION':
    // eslint-disable-next-line
    console.log('TOGGLE_SELECT_LOCATION')
    newState.map = {
      ...newState.map,
      selectLocation: !newState.map.selectLocation
    };
    break;
  default:
    break;
  }

  return newState;
};

export default reducer;