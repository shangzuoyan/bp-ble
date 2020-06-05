import React from 'react';
import RegisterDevice from './RegisterDevice';
import RegisterContainer from './RegisterContainer';

export default function RegisterDeviceContainer({
  devices,
  onCancel,
  onSuccess,
}) {
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [deviceToRegister, setDeviceToRegister] = React.useState(undefined);

  if (isRegistering) {
    return (
      <RegisterContainer
        onSuccess={onSuccess}
        onCancel={onCancel}
        device={deviceToRegister}
      />
    );
  } else {
    return (
      <RegisterDevice
        devices={devices}
        onRegister={(device) => {
          console.log('Hey device is here', device);
          setIsRegistering(true);
          setDeviceToRegister(device);
        }}
        onCancel={onCancel}
      />
    );
  }
}
