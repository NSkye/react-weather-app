const defaultState =  {
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

const createKey = ((lastKey = 0) => () => (lastKey++))();

const reducer = (state = defaultState, action) => {
  const newState = { ...state };

  switch (action.type) {
  case 'CHANGE_COORDINATES':
    newState.map = {
      ...newState.map,
      coordinates: action.value
    };
    break;
  case 'FOCUS_ON_LOCATION':
    newState.map = {
      ...newState.map,
      coordinates: action.value,
      zoom: 10
    };
    break;
  case 'TOGGLE_SELECT_LOCATION':
    newState.map = {
      ...newState.map,
      selectLocation: !newState.map.selectLocation
    };
    break;
  case 'ADD_LOCATION_ITEM':
    newState.locations.list.find(item => {
      const [ lat, lon ] = item.coordinates;
      const [ latN, lonN ] = action.value;
      return lat === latN && lon === lonN;
    }) ||
    (newState.locations = {
      ...newState.locations,
      list: [{
        key: createKey(),
        coordinates: action.value,
        info: null,
        lastRefresh: -Infinity
      }].concat([ ...newState.locations.list ])
    });
    // eslint-disable-next-line
    console.log(newState);
    break;
  case 'DELETE_LOCATION_ITEM':
    newState.locations = {
      ...newState.locations,
      list: state.locations.list.filter(item => item.key !== action.key)
    };
    break;
  case 'APPLY_DATA_TO_ITEM':
    newState.locations = {
      ...newState.locations,
      list: [...newState.locations.list].map(item => {
        if (item.key !== action.key) return item;
        return {
          ...item,
          info: action.info,
          lastRefresh: Date.now()
        };
      })
    };
    // eslint-disable-next-line
    console.log(newState); 
    break;
  case 'SAVE_LOCALLY':
    localStorage.setItem('LOCATIONS', JSON.stringify(state.locations.list));
    break;
  case 'RESTORE_LOCATION_ITEM':
    newState.locations = {
      ...newState.locations,
      list: [ ...newState.locations.list ].concat([{
        ...action.value,
        key: createKey()
      }])
    };
    break;
  default:
    break;
  }

  return newState;
};

export default reducer;