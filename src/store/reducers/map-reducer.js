import { createSelector } from 'reselect';

const defaultState = {
  coordinates: [55.76, 37.64],
  zoom: 3,
  selectLocation: false
};

export function mapReducer(state = defaultState, action) {
  const newState = { ...state };

  switch (action.type) {
    case 'CHANGE_COORDINATES':
      newState.coordinates = action.value;
      break;
    case 'FOCUS_ON_LOCATION':
      newState.coordinates = action.value;
      newState.zoom = 10;
      break;
    case 'TOGGLE_SELECT_LOCATION':
      newState.selectLocation = !newState.selectLocation;
      break;
    default:
      break;
  }

  return newState;
}

export const selectMapState = createSelector(
  state => state.mapReducer.coordinates[0],
  state => state.mapReducer.coordinates[1],
  state => state.mapReducer.zoom,
  state => state.mapReducer.selectLocation,
  ( lat, lon, zoom, selectLocation ) => ({ coordinates: [lat, lon], zoom, selectLocation})
);

