import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './AuthPage.scss';
import { useHttp } from '../../hooks/http.hook';
import ToastError from '../../common/Toast';

export const AuthPage = (): any => {
  const { loading, customError, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');

  useEffect(() => {
    setErr(customError);
    // clearError();
  }, [customError, clearError]);

  const formHandler = (event: any): void => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const requestHandler = async (): Promise<void> => {
    try {
      const data = await request('/api/signup', 'POST', { ...form });
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
          <Button className="me-2" variant="primary" type="submit" disabled={loading}>
            Log In
          </Button>
          <Button variant="secondary" type="submit" onClick={requestHandler} disabled={loading}>
            Sign Up
          </Button>
        </Form>
      </div>
      {customError ? <ToastError message={customError} /> : null}
    </div>
  );
};
