import Toast from 'react-bootstrap/Toast';
import './Toast.scss';
import { useState } from 'react';

function ToastError({ message }: { message: string }): JSX.Element {
  const [showToast, setShowToast] = useState(true);

  const toggleShowToast = (): void => setShowToast(false);

  return (
    <Toast className="toast" onClose={toggleShowToast} show={showToast}>
      <Toast.Header className="toast-header">
        <strong className="me-auto">Message</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ToastError;
