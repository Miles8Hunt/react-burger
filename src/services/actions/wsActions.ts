import { IWsConnectionStartAction,  IWsConnectionSuccessAction, IWsConnectionErrorAction, IWsConnectionClosedAction, IWsGetMessageAction, IWsMessage } from "../types/types";


export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const wsConnectionStart = (url: string): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload: url
  };
};

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (error: string): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: error
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message: IWsMessage): IWsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};
