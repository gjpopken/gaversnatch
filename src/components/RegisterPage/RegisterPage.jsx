import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import { Button } from 'primereact/button';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className='container'>
      <h2>Welcome to the World of</h2>
      <h1>GAVERSNATCH</h1>
      <div className="grid">
        <div  style={{position: 'relative'}}>
          <Button
            onClick={() => history.push('/login')}
            style={{ position: 'absolute', left: '-75px' }}>
            <span className='pi pi-arrow-left'></span>
          </Button>
          <RegisterForm />
        </div>
      </div>


      <center>
        <Button
          link
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
