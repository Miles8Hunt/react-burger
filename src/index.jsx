import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/index';
import { BrowserRouter as Router } from 'react-router-dom';

import { socketMiddleware } from './services/middleware/socketMiddleware';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './services/actions/wsActions';

const wsActions = {
  wsStart: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE,
  wsSend: WS_SEND_MESSAGE
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

//const enhancer = composeEnhancers(applyMiddleware(thunk));

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

const store = createStore(rootReducer, enhancer);

root.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
      <App />
    </Provider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
