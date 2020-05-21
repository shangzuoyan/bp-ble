import React from 'react';

import SyncComponent from '../components/SyncComponent';
import BP_BLE_Provider from '../contexts/BP_BLE_Provider';
export default function Sync() {
  return (
    <BP_BLE_Provider>
      <SyncComponent />
    </BP_BLE_Provider>
  );
}
