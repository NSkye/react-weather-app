import { createSelectorCreator, defaultMemoize } from 'reselect';

const defaultState =  {
  list: []
};

const createKey = ((lastKey = 0) => () => (lastKey++))();

const checkCoordsForEquality = (itemCoordinates, actionValue) => {
  const [ lat, lon ] = itemCoordinates;
  const [ latN, lonN ] = actionValue;
  return lat === latN && lon === lonN;
};

export function locationListReducer (state = defaultState, action) {
  const newState = { ...state };

  switch (action.type) {
    case 'ADD_LOCATION_ITEM':
      if (newState.list.find(item => checkCoordsForEquality(item.coordinates, action.value))) {
        break;
      }
      newState.list= [{
        key: createKey(),
        coordinates: action.value,
        info: null,
        lastRefresh: -Infinity
      }].concat(newState.list);
      break;
    case 'DELETE_LOCATION_ITEM':
      newState.list = state.list.filter(item => item.key !== action.key);
      break;
    case 'APPLY_DATA_TO_ITEM':
      newState.list = newState.list.map(item => {
        if (item.key !== action.key) return item;
        return {
          ...item,
          info: action.info,
          lastRefresh: Date.now()
        };
      });
      break;
    case 'SAVE_LOCALLY':
      localStorage.setItem('LOCATIONS', JSON.stringify(state.list));
      break;
    case 'RESTORE_LOCATION_ITEM':
      newState.list = newState.list.concat([{
        ...action.value,
        key: createKey()
      }]);
      break;
    default:
      break;
  }

  return newState;
}

function compareItemLists(prev, next) {
  if (prev === next) { return true; }
  if (prev.length != next.length) { return false; }
  let i = 0;
  while(i < prev.length) {
    if (
      (!prev[i].info && next[i].info) ||
      (prev[i].info && !next[i].info)
    ) { return false; }
    if (!prev.info || !next.info) { i++; continue; }
    if (
      prev[i].info.humidity !== next[i].info.humidity ||
      prev[i].info.icon !== next[i].info.icon ||
      prev[i].info.temp !== next[i].info.temp ||
      prev[i].info.weather !== next[i].info.weather ||
      prev[i].info.wind !== next[i].info.wind
    ) { return false; }
    i++;
  }
}

const createLocationListSelector = createSelectorCreator(
  defaultMemoize,
  compareItemLists
);

export const selectLocationList = createLocationListSelector(
  state => state.locationListReducer.list,
  list => list
);