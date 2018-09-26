import { combineReducers } from 'redux';

import { locationListReducer } from './location-list-reducer';
import { mapReducer } from './map-reducer';
import { fetchReducer } from './fetch-reducer';
import { sideBarReducer } from './sidebar-reducer';
export { selectMapState, selectMapNoErrors } from './map-reducer';
export { selectLocationList } from './location-list-reducer';
export { selectSideBarState } from './sidebar-reducer';

export const reducer = combineReducers({
  locationListReducer,
  mapReducer,
  fetchReducer,
  sideBarReducer
});