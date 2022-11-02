import Toast from 'react-bootstrap/Toast';
import './Toast.scss';
import { ForwardedRef, forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const ToastNotification = forwardRef(({ ...props }: any, ref: ForwardedRef<any>): any => {
  const [showToast, setShowToast] = useState(false);
  const [style, setStyle] = useState('');
  const auth = useContext(AuthContext);

  console.log(props);

  useImperativeHandle(
    ref,
    () => ({
      show() {
        console.log('show', props);
        setStyle(props.statusData === 200 ? 'toast-success' : 'toast-error');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      },
    }),
    [auth, props]
  );

  const toggleShowToast = (): void => setShowToast(false);

  return (
    <Toast className={style} onClose={toggleShowToast} show={showToast}>
      <Toast.Header className="toast-header">
        <strong className="me-auto">Message</strong>
      </Toast.Header>
      <Toast.Body>{props.messageData}</Toast.Body>
    </Toast>
  );
});

export default ToastNotification;
