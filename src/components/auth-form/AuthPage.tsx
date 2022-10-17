import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './AuthPage.scss';

export const AuthPage = (): any => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const formHandler = (event: { target: { name: any; value: any } }): void => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex align-items-center h-100">
      <div className="col-6 offset-3">
        <Form className="border p-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={formHandler} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={formHandler} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button className="me-2" variant="primary" type="submit">
            Log In
          </Button>
          <Button variant="secondary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};
