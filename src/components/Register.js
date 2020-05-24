import React from 'react';

import RegisterDevice from './RegisterDevice';
import Registering from './Registering';
export default function Register({device, onCancel, onSuccess}) {
  const [isRegistering, setIsRegistering] = React.useState(false);

  if (isRegistering) {
    return (
      <Registering onSuccess={onSuccess} onCancel={onCancel} device={device} />
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
