import { Form } from 'formik';
import React, { useState } from 'react';
import ModalWithForm from './ModalWithForm';

const AddUserForm = ({ refModal }: any): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ModalWithForm isOpen={open} refModal={refModal} handleClose={() => setOpen(false)} />

      <button className="button-modal" type="button" onClick={() => setOpen(true)}>
        Modal
      </button>

      <button className="button" type="submit">
        Send
      </button>
    </div>
  );
};

export default AddUserForm;
