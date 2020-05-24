import React from 'react';
import BloodPressureContext from './BloodPressureContext';
import bloodPressureReducer from '../reducers/bloodPressureReducer';
const initialState = {
  bloodPressureReadings: [],
  isPaired: false,
  device: {},
  currentSync: {},
};

export default ({children}) => {
  const [state, dispatch] = React.useReducer(
    bloodPressureReducer,
    initialState,
  );
  return (
    <BloodPressureContext.Provider value={[state, dispatch]}>
      {children}
    </BloodPressureContext.Provider>
  );
};
