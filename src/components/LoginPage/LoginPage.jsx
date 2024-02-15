import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';

function LoginPage() {
  const history = useHistory();

  return (
    <div className='container'>
      {/* <h2>Welcome to the World of</h2>
      <h1>GAVERSNATCH</h1> */}
       <div className="gaversnatch">
        <img src="/Gaversnatchlogo.png" alt=""
        style={{maxWidth: '1500px'}} />
      </div>
      <div className="grid ">
        <div style={{position: 'relative'}}>
          <Button onClick={() => history.push('/home')} style={{position: 'absolute', left: '-75px'}}><span className='pi pi-arrow-left'></span></Button>
          <LoginForm />
        </div>


      </div>
      <center>
        <Button
          link
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
