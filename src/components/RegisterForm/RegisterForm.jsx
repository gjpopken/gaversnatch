import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Card>
      <form className="formPanel" onSubmit={registerUser} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ textAlign: 'center', minWidth: '300px' }}>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}

        <label htmlFor="username">
          Username:
        </label>
        <InputText
          type="text"
          name="username"
          value={username}
          id='username'
          required
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">
          Password:
        </label>
        <InputText
          type="password"
          name="password"
          id='password'
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button type="submit" name="submit" label="Register" style={{ marginTop: '15px' }} />

      </form>
    </Card>
  );
}

export default RegisterForm;
