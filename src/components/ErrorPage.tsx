import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ErrorPage = (): any => {
  const navigate = useNavigate();

  const navigateHandler = (): any => {
    navigate('/');
  };

  return (
    <div>
      <h2>404</h2>
      <p>Page not found</p>
      <Link to="/">
        <Button variant="primary" onClick={navigateHandler}>
          Back to the main page
        </Button>
      </Link>
    </div>
  );
};
