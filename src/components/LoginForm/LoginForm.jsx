import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Card>
      <form className="formPanel" onSubmit={login} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ textAlign: 'center', minWidth: '300px' }}>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}

        <label htmlFor="username">
          Username:
        </label>
        <InputText
          type="text"
          name="username"
          id='username'
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">
          Password:
        </label>
        <InputText
          type="password"
          name="password"
          id='password'
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" name="submit" label="Log In" style={{ marginTop: '15px' }} />
      </form>
    </Card>

  );
}

export default LoginForm;
