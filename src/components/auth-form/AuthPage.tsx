import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import './AuthPage.scss';
import { useHttp } from '../../hooks/http.hook';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { IAuth } from '../../interfaces';
import * as Yup from 'yup';

export const AuthPage = (): any => {
  const { loading, customError, request, clearError } = useHttp();
  const [form, setForm] = useState<IAuth>({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');
  const [forgotPWD, setForgotPWD] = useState(true);
  const [result, setResult] = useState<any>({});
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const inputEl = useRef<any>(null);

  useEffect(() => {
    inputEl.current ? inputEl.current.focus() : null;
  });

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
      if (data) {
        auth.login(data.accessToken, data.userId, data.message, data.status);
        auth.isAuthenticated = true;
        auth.accessToken = data.accessToken;
        auth.userId = data.userId;
        auth.messageData = data.message;
        auth.statusData = data.status;
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message, { position: 'bottom-right' });
    }
  };

  const loginHandler = async (props: any): Promise<void> => {
    try {
      const data = await request('/api/login', 'POST', props);
      if (data) {
        setResult(data);
        auth.login(data.accessToken, data.userId, data.message, data.status);
        auth.isAuthenticated = true;
        auth.accessToken = data.accessToken;
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

  const forgotPasswordHandler = async (props: any): Promise<void> => {
    if (props.values) {
      if (props.values.email && !props.errors.email) {
        try {
          const data = await request('/api/restorePassword', 'POST', props.values);
          if (data) {
            setForgotPWD(true);
            toast.success(data.message, { position: 'bottom-right' });
          }
        } catch (error) {
          toast.error(error.message, { position: 'bottom-right' });
        }
      } else {
        setForgotPWD(false);
        toast.error('Email: ' + props.errors.email, { position: 'bottom-right' });
      }
    } else {
      setForgotPWD(!forgotPWD);
    }
  };

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
            setForm(values);
            loginHandler(values);
            setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <div className="auth-form flex-column p-3">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    className="input"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    type="email"
                    innerRef={inputEl}
                  />
                  {props.errors.email && props.touched.email ? (
                    <div className="notification">{props.errors.email}</div>
                  ) : null}
                </div>
                {forgotPWD && (
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
                )}
                {forgotPWD ? (
                  <div className="d-flex justify-content-between btn-group mt-3 w-100">
                    <div>
                      <Button className="me-2" variant="warning" type="submit" disabled={loading}>
                        Log In
                      </Button>
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => registerHandler(props)}
                        disabled={loading}
                      >
                        Sign Up
                      </Button>
                    </div>
                    <a className="forgot-password" onClick={forgotPasswordHandler}>
                      Forgot password?
                    </a>
                  </div>
                ) : (
                  <>
                    <Button
                      className="mt-2"
                      variant="warning"
                      type="button"
                      onClick={() => forgotPasswordHandler(props)}
                      disabled={loading}
                    >
                      Restore password
                    </Button>
                    <Button
                      className="mt-2 ms-3"
                      variant="outline-secondary"
                      type="button"
                      onClick={() => {
                        setForgotPWD(true);
                      }}
                      disabled={loading}
                    >
                      Back
                    </Button>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
