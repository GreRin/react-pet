import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const Modal = ({ onClose, children, actionBar }: any): any => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div onClick={onClose} className="position-absolute bg-light opacity-75"></div>
      <div className="position-absolute p-3 bg-white">
        <div className="d-flex flex-column justify-content-between">
          {children}
          {actionBar}
        </div>
      </div>
    </div>,
    document.querySelector<any>('.modal-container')
  );
};

export default Modal;
