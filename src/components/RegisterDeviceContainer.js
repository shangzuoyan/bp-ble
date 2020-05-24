import React from 'react';
import RegisterDevice from './RegisterDevice';
import RegisterContainer from './RegisterContainer';

export default function RegisterDeviceContainer({device, onCancel, onSuccess}) {
  const [isRegistering, setIsRegistering] = React.useState(false);

  if (isRegistering) {
    return (
      <RegisterContainer
        onSuccess={onSuccess}
        onCancel={onCancel}
        device={device}
      />
    );
  } else {
    return (
      <RegisterDevice
        device={device}
        onRegister={() => setIsRegistering(true)}
        onCancel={onCancel}
      />
    );
  }
}
