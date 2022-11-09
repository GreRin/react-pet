import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './AuthPage.scss';
import { useHttp } from '../../hooks/http.hook';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { IAuth } from './interface';
import * as Yup from 'yup';

export const AuthPage = (): any => {
  const { loading, customError, request, clearError } = useHttp();
  const [form, setForm] = useState<IAuth>({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');
  const [result, setResult] = useState<any>({});
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    setErr(customError);
    clearError();
  }, [customError, clearError]);

  useEffect(() => {
    toast(result.message);
  }, [result, auth]);

  const registerHandler = async (props: any): Promise<any> => {
    setForm(props.values);
    try {
      const data = await request('/api/signup', 'POST', props.values);
      console.log(data);
      if (data) {
        auth.login(data.token, data.userId, data.message, data.status);
        auth.isAuthenticated = true;
        auth.token = data.token;
        auth.userId = data.userId;
        auth.messageData = data.message;
        auth.statusData = data.status;
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message, { position: 'bottom-right' });
    }
  };

  const loginHandler = async (): Promise<void> => {
    try {
      const data = await request('/api/login', 'POST', { ...form });
      if (data) {
        setResult(data);
        auth.login(data.token, data.userId, data.message, data.status);
        auth.isAuthenticated = true;
        auth.token = data.token;
        auth.userId = data.userId;
        auth.messageData = data.message;
        auth.statusData = data.status;
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message, { position: 'bottom-right' });
    }
  };

  const AuthSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  return (
    <div className="d-flex align-items-center h-100">
      <div className="col-6 offset-3">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={AuthSchema}
          onSubmit={(values: IAuth, { setSubmitting }: FormikHelpers<IAuth>) => {
            console.log(values);
            setForm(values);
            loginHandler();
            setSubmitting(false);
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
                <div className="btn-group mt-3">
                  <Button className="me-2" variant="warning" type="submit" disabled={loading}>
                    Log In
                  </Button>
                  <Button variant="secondary" type="button" onClick={() => registerHandler(props)} disabled={loading}>
                    Sign Up
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
