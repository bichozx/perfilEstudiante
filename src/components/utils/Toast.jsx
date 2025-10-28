import React, { useEffect, useState } from 'react';

import { Toast } from 'react-bootstrap';

export default function ToastMessage({ message, type = 'success', show, onClose }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <>
      <Toast
        bg={type === 'error' ? 'danger' : type}
        onClose={onClose}
        show={visible}
        delay={3000}
        autohide
      >
        <Toast.Header closeButton={true}>
          <strong className="me-auto">
            {type === 'error' ? 'Error' : 'Mensaje'}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </>
  );
}
