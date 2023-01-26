import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import FormModal from './Form-modal';

const AddUserForm = ({ isOpen, handleClose, handleState }: any): JSX.Element => {
  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <FormModal onHide={handleClose} handleState={handleState} />
    </Modal>
  );
};

export default memo(AddUserForm);
