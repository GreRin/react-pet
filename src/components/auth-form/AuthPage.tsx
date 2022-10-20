import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './AuthPage.scss';
import { useHttp } from '../../hooks/http.hook';
import ToastError from '../../common/Toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const AuthPage = (): any => {
  const { loading, customError, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    setErr(customError);
    clearError();
  }, [setErr, clearError]);

  const formHandler = (event: any): void => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async (): Promise<void> => {
    try {
      const data = await request('/api/signup', 'POST', { ...form });
      if (data) navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async (): Promise<void> => {
    try {
      const data = await request('/api/login', 'POST', { ...form });
      if (data) {
        auth.login(data.token, data.userId);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center h-100">
      <div className="col-6 offset-3">
        <Form className="border p-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" onChange={formHandler} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" onChange={formHandler} />
          </Form.Group>
          <Button className="me-2" variant="primary" type="submit" onClick={loginHandler} disabled={loading}>
            Log In
          </Button>
          <Button variant="secondary" type="submit" onClick={registerHandler} disabled={loading}>
            Sign Up
          </Button>
        </Form>
      </div>
      {customError ? <ToastError message={customError} /> : null}
    </div>
  );
};
