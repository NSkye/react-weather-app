import { takeEvery } from 'redux-saga/effects';

function* fetchWeatherDataWorker(...args) {
  //eslint-disable-next-line
  yield console.log(...args);

  yield console.log('fetched data');
}

function* fetchWeatherDataWatcher() {
  yield takeEvery('CHANGE_COORDINATES', fetchWeatherDataWorker);
}

export default fetchWeatherDataWatcher;