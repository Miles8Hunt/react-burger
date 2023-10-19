import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IWSActions } from './types/types'
import { rootReducer } from '../services/reducers/index';
import { socketMiddleware } from '../services/middleware/socketMiddleware';
import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_SEND_MESSAGE } from '../services/actions/wsActions';


const wsActionsAllOrders: IWSActions = {
  wsStart: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE,
  wsSend: WS_SEND_MESSAGE
};

const enhancer = composeWithDevTools(applyMiddleware(thunk, 
    socketMiddleware(wsActionsAllOrders)
    ));   

const store = createStore(rootReducer, enhancer);

export default store;
