import React from 'react';
import BP_BLE_Context from './BP_BLE_Context';
import useBloodPressureManager from '../hooks/useBloodPressureManager';

export default ({children}) => {
  const {bleManager} = useBloodPressureManager();
  return (
    <BP_BLE_Context.Provider
      value={React.useMemo(() => {
        return {bleManager};
      }, [bleManager])}>
      {children}
    </BP_BLE_Context.Provider>
  );
};
