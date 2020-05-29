import React from 'react';
import LogContext from './LogContext';
const initialState = {
  log: [],
};

const logReducer = (state, action) => {
  if (__DEV__) {
    console.log(JSON.stringify(state), JSON.stringify(action));
  }
  switch (action.type) {
    case 'CLEAR':
      return initialState;
    case 'ERROR':
      return {
        ...state,
        log: [
          {
            row: state.log.length,
            level: 'e',
            log: action.payload,
            timeStamp: Date.now(),
          },
          ...state.log,
        ],
      };
    case 'WARN':
      return {
        ...state,
        log: [
          {
            row: state.log.length,
            level: 'w',
            log: action.payload,
            timeStamp: Date.now(),
          },
          ...state.log,
        ],
      };
    case 'INFO':
      return {
        ...state,
        log: [
          {level: 'i', log: action.payload, timeStamp: Date.now()},
          ...state.log,
        ],
      };
    default:
      return state;
  }
};

export default ({children}) => {
  const [state, dispatch] = React.useReducer(logReducer, initialState);

  const error = (payload) => dispatch({type: 'ERROR', payload});
  const info = (payload) => dispatch({type: 'INFO', payload});
  const warn = (payload) => dispatch({type: 'WARN', payload});
  const clear = (payload) => dispatch({type: 'CLEAR'});

  return (
    <LogContext.Provider value={{state, error, info, warn, clear}}>
      {children}
    </LogContext.Provider>
  );
};
