import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { memo, useState } from 'react';
import * as Yup from 'yup';
import { IAuth } from '../../components/auth-form/interface';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/thunks/addUser';
import { AppDispatch } from '../../store';

const AuthSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const FormModal = ({ onHide, handleState }: any): any => {
  const [form, setForm] = useState<IAuth>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch<AppDispatch>();

  const addUserHandler = async (props: any): Promise<void> => {
    try {
      dispatch(addUser({ props }));
      handleState(props);
    } catch (error) {
      toast.error(error.message, { position: 'bottom-right' });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={AuthSchema}
        onSubmit={(values: IAuth, { setSubmitting }: FormikHelpers<IAuth>) => {
          setForm(values);
          addUserHandler(values);
          setSubmitting(false);
          onHide();
        }}
      >
        {(props) => (
          <Form>
            <div className="auth-form flex-column p-3">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field className="input" id="email" name="email" placeholder="example@gmail.com" type="email" />
                {props.errors.email && props.touched.email ? (
                  <div className="notification">{props.errors.email}</div>
                ) : null}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <Field
                  className="input"
                  id="password"
                  name="password"
                  placeholder="example@gmail.com"
                  type="password"
                />
                {props.errors.password && props.touched.password ? (
                  <div className="notification">{props.errors.password}</div>
                ) : null}
              </div>
              <div className="d-flex justify-content-between btn-group mt-3 w-100">
                <div>
                  <Button className="me-2" variant="warning" type="submit" disabled={false}>
                    Log In
                  </Button>
                  <Button variant="secondary" type="button" onClick={() => onHide()} disabled={false}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default memo(FormModal);
