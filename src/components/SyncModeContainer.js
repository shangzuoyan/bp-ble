import React from 'react';

import BloodPressureContext from '../contexts/BloodPressureContext';

import SyncContainer from './SyncContainer';
import SyncReadings from './SyncReadings';

export default function SyncModeContainer({onClose, onSuccess}) {
  const [{device}] = React.useContext(BloodPressureContext);
  const [syncing, setSyncing] = React.useState(false);

  if (syncing) {
    return (
      <SyncContainer onCancel={() => setSyncing(false)} onSuccess={onSuccess} />
    );
  }
  return (
    <SyncReadings
      onTransfer={() => setSyncing(true)}
      onCancel={onClose}
      device={device}
    />
  );
}
