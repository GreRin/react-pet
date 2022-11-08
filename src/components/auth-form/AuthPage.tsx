import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './AuthPage.scss';
import { useHttp } from '../../hooks/http.hook';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export const AuthPage = (): any => {
  const { loading, customError, request, clearError } = useHttp();
  const [form, setForm] = useState({
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

  const formHandler = (event: any): void => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async (): Promise<void> => {
    try {
      const data = await request('/api/signup', 'POST', { ...form });
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
          <Button className="me-2" variant="warning" type="submit" onClick={loginHandler} disabled={loading}>
            Log In
          </Button>
          <Button variant="secondary" type="submit" onClick={registerHandler} disabled={loading}>
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};
