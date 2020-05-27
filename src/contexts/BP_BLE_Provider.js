import React from 'react';
import BP_BLE_Context from './BP_BLE_Context';
import useBleManager from '../hooks/useBleManager';

export default ({children}) => {
  const {bleManager, bluetoothState} = useBleManager();
  return (
    <BP_BLE_Context.Provider
      value={React.useMemo(() => {
        return {bleManager, bluetoothState};
      }, [bleManager, bluetoothState])}>
      {children}
    </BP_BLE_Context.Provider>
  );
};
