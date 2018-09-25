import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchWeatherDataCoords, fetchWeatherDataQuery } from '../../API/owm';
import { applyFetchedData, registerFetchData } from '../actions';

function* fetchWeatherDataWorker(action) {
  let data;
  const controller = new AbortController();
  const signal = controller.signal;
  yield put(registerFetchData(controller, action.key));
  const fetchMethod = Array.isArray(action.value) ? fetchWeatherDataCoords : fetchWeatherDataQuery; 
  data = yield call(fetchMethod, action.value, signal);
  yield put(applyFetchedData(action.key, data));
  
}

function* fetchWeatherDataWatcher() {
  yield takeEvery('FETCH_WEATHER_DATA', fetchWeatherDataWorker);
}

export default fetchWeatherDataWatcher;