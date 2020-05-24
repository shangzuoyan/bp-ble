import React from 'react';
import Scan from './Scan';
import StartScan from './StartScan';
export default function RegistrationMode({onClose}) {
  const [registeringState, setRegisteringState] = React.useState(false);

  if (registeringState) {
    return (
      <Scan onCancel={() => setRegisteringState(false)} onSuccess={onClose} />
    );
  }
  return (
    <StartScan onScan={() => setRegisteringState(true)} onClose={onClose} />
  );
}
