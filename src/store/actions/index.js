export const changeCoordinates = coordinates => ({
  type: 'CHANGE_COORDINATES', 
  value: coordinates 
});

export const focusOnLocation = coordinates => ({
  type: 'FOCUS_ON_LOCATION',
  value: coordinates
});

export const toggleSelectLocation = () => ({
  type: 'TOGGLE_SELECT_LOCATION'
});

export const addLocation = coordinates => ({
  type: 'ADD_LOCATION_ITEM',
  value: coordinates
});

export const deleteLocation = key => ({
  type: 'DELETE_LOCATION_ITEM',
  key
});

export const applyFetchedData = (key, info) => ({
  type: 'APPLY_DATA_TO_ITEM',
  key, info
});

export const restoreLocation = (locationObj) => ({
  type: 'RESTORE_LOCATION_ITEM',
  value: locationObj
});

export const fetchData = (coordinates, key) => ({
  type: 'FETCH_WEATHER_DATA', value: coordinates, key
});

export const saveData = () => ({
  type: 'SAVE_LOCALLY'
});