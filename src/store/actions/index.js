// MAP ACTIONS

/**
 * Меняет координаты центра карты
 * @param {Array} coordinates координаты [lat, long]
 */
export const changeCoordinates = coordinates => ({
  type: 'CHANGE_COORDINATES', 
  value: coordinates 
});

/**
 * Меняет координаты центра карты и увеличивает зум, если он уже не увеличен
 * @param {Array} coordinates координаты [lat, long]
 */
export const focusOnLocation = coordinates => ({
  type: 'FOCUS_ON_LOCATION',
  value: coordinates
});

/**
 * Включает/отключает интерактивность карты
 */
export const toggleSelectLocation = () => ({
  type: 'TOGGLE_SELECT_LOCATION'
});

// LOCATION LIST ACTIONS

/**
 * Принимает на вход координаты [lat, long] или строку запроса  
 * Добавляет новую локацию с погодой
 * @param {String|Array} coordinatesOrQuery координаты в виде массива ([lat, long]) или строка запроса
 */
export const addLocation = coordinatesOrQuery => ({
  type: 'ADD_LOCATION_ITEM',
  value: coordinatesOrQuery
});

/**
 * Удаляет локацию с погодой
 * @param {Number} key ключ итема
 */
export const deleteLocation = key => ({
  type: 'DELETE_LOCATION_ITEM',
  key
});

/**
 * Вносит данные о погоде и местоположении в итем локации
 * @param {Number} key ключ итема
 * @param {Object} info информация, которую требуется внести
 */
export const applyFetchedData = (key, info) => ({
  type: 'APPLY_DATA_TO_ITEM',
  key, info
});

/**
 * Восстановить итем локации. Применяется при добавлении данных из localStorage
 * @param {Object} locationObj объект итема локации
 */
export const restoreLocation = (locationObj) => ({
  type: 'RESTORE_LOCATION_ITEM',
  value: locationObj
});

/**
 * Сохранить текущий список локаций в localStorage
 */
export const saveData = () => ({
  type: 'SAVE_LOCALLY'
});

// FETCH ACTIONS

/**
 * Зафетчить данные из OpenWeatherMap
 * @param {Array|String} coordinatesOrQuery координаты ([lat, long]) или строка запроса
 * @param {Number} key ключ итема к которому надо будет применить зафетченные данные
 */
export const fetchData = (coordinatesOrQuery, key) => ({
  type: 'FETCH_WEATHER_DATA', value: coordinatesOrQuery, key
});

/**
 * Сохраняет AbortController реквеста для возможности его отмены
 * @param {Object} controller AbortController
 * @param {Number} key ключ итема, для которого делается реквест
 */
export const registerFetchData = (controller, key) => ({
  type: 'REGISTER_REQUEST',
  key, controller
});

/**
 * Отменить фетчинг данных
 * @param {Number} key ключ итема, для которого делается реквест
 */
export const abortFetchData = key => ({
  type: 'ABORT_REQUEST',
  key
});

/**
 * Удаляет AbortController
 * @param {Number} key ключ итема, для которого делался реквест
 */
export const removeRequest = key => ({
  type: 'REMOVE_REQUEST',
  key
});

// SIDEBAR

/**
 * Открыть/закрыть боковое меню
 */
export const toggleSideBar = () => ({
  type: 'TOGGLE_SIDEBAR'
});