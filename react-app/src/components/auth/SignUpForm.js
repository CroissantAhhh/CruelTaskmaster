import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  async function demoLogin(e) {
    e.preventDefault();
    await dispatch(login("jasonzhou8597@gmail.com", "jasonzhou2"));
  }

  return (
    <form className="signup-form" onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="signup-form-section">
        <label htmlFor="username">User Name</label>
        <input
          id="username"
          type='text'
          placeholder='Username'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="signup-form-section">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type='text'
          placeholder='Email'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="signup-form-section">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type='password'
          placeholder='Password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="signup-form-section">
        <label htmlFor="repeat-password">Repeat Password</label>
        <input
          id="repeat-password"
          type='password'
          placeholder='Confirm password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className="signup-form-buttons">

        <button type='submit'>Sign Up</button>
        <button className="demo-login" onClick={demoLogin}>Demo Login</button>
      </div>
    </form>
  );
};

export default SignUpForm;
