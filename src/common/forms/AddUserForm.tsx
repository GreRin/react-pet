import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import FormModal from './Form-modal';

const AddUserForm = ({ isOpen, handleClose }: any): JSX.Element => {
  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <FormModal onHide={handleClose} />
    </Modal>
  );
};

export default memo(AddUserForm);
