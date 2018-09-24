import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchWeatherDataCoords } from '../../API/owm';
import { applyFetchedData } from '../actions';

function* fetchWeatherDataWorker(action) {
  let data;
  try {
    // eslint-disable-next-line
    console.log('recieved action:', action);
    data = yield call(fetchWeatherDataCoords, action.value);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
  // eslint-disable-next-line
  console.log('Fetched: ', data);
  yield put(applyFetchedData(action.key, data));
  
}

function* fetchWeatherDataWatcher() {
  yield takeEvery('FETCH_WEATHER_DATA', fetchWeatherDataWorker);
}

export default fetchWeatherDataWatcher;