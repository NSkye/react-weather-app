import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import reducer from './reducers';
import fetchWeatherDataWatcher from './sagas/fetch-location-weather-data';

const saga = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(saga));
saga.run(fetchWeatherDataWatcher);

// eslint-disable-next-line
ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
