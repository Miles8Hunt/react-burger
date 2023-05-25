export const socketMiddleware = (wsActions) => {

  return store => {

    let socket = null;
    let url = undefined;

    return (next) => (action) => {
      
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, onOpen, onError, onClose, onMessage, wsSend } = wsActions;

      if (type === wsStart) {
        url = payload;
        socket = new WebSocket(url);
      } 

      if (socket) {

        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (
            restParsedData.message === "Invalid or missing token" ||
            restParsedData.message === "jwt expired"
          ) {            
            dispatch({ type: onError, payload: restParsedData.message });
          } else {            
            dispatch({ type: onMessage, payload: restParsedData });
          }
        };

        socket.onClose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
        
        if (type === wsSend) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};
