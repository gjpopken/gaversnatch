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
      {/* <h2>Welcome to the World of</h2>
      <h1>GAVERSNATCH</h1> */}
      <div className="gaversnatch">
        <img src="/Gaversnatchlogo.png" alt=""
        style={{maxWidth: '1500px'}} />
      </div>
      <Button onClick={onLogin} label='Begin'
      style={{marginTop: '30px', width: '200px'}}
      >
        
      </Button>
    </div>
  );
}

export default LandingPage;
