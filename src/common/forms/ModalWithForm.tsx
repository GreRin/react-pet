import Modal from '../modal/Modal';
import { memo } from 'react';
import FormModal from './Form-modal';

const ModalWithForm = ({ isOpen, handleClose, refModal }: any): JSX.Element => {
  return (
    <Modal open={isOpen} onClose={handleClose} center container={refModal.current} focusTrapped>
      <FormModal />
    </Modal>
  );
};

export default memo(ModalWithForm);
