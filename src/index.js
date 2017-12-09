import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from 'modules/root/rootReducer';
import rootSaga from 'modules/root/rootSaga';

import 'index.css';
import App from 'modules/root/App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();