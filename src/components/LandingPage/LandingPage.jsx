import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Button } from 'primereact/button';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>Welcome to the World of</h2>
      <h1>GAVERSNATCH</h1>
      <Button onClick={onLogin}>
        Login
      </Button>
    </div>
  );
}

export default LandingPage;
