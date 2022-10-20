import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const ErrorPage = (): any => {
  const navigate = useNavigate();

  const navigateHandler = (): void => {
    navigate('/home');
  };

  return (
    <div>
      <h2>404</h2>
      <p>Page not found</p>
      <Link to="/home">
        <Button variant="primary">Back to the main page</Button>
      </Link>
    </div>
  );
};
