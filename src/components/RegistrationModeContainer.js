import React from 'react';
import ScanContainer from './ScanContainer';
import Scan from './Scan';

export default function RegistrationModeContainer({onSuccess, onClose}) {
  const [registeringState, setRegisteringState] = React.useState(false);

  if (registeringState) {
    return (
      <ScanContainer
        onCancel={() => setRegisteringState(false)}
        onSuccess={onSuccess}
      />
    );
  }
  return <Scan onScan={() => setRegisteringState(true)} onClose={onClose} />;
}
