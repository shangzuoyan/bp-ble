import React from 'react';
import BP_BLE_Context from './BP_BLE_Context';
import useBleManager from '../hooks/useBleManager';

export default ({children, error, warn, info}) => {
  const {bleManager, bluetoothState} = useBleManager(error, warn, info);
  return (
    <BP_BLE_Context.Provider
      value={React.useMemo(() => {
        return {
          bleManager,
          bluetoothState,
          logError: error,
          logWarn: warn,
          logInfo: info,
        };
      }, [bleManager, bluetoothState, error, warn, info])}>
      {children}
    </BP_BLE_Context.Provider>
  );
};
