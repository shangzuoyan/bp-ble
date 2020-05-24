import React from 'react';
import Transferring from './Transferring';
import TransferData from './TransferData';
import BloodPressureContext from '../contexts/BloodPressureContext';
export default function TransferMode({onClose}) {
  const [{device}] = React.useContext(BloodPressureContext);
  const [transferState, setTransferState] = React.useState(false);

  if (transferState) {
    return (
      <Transferring
        onCancel={() => setTransferState(false)}
        onSuccess={onClose}
      />
    );
  }
  return (
    <TransferData
      onTransfer={() => setTransferState(true)}
      onCancel={onClose}
      device={device}
    />
  );
}
