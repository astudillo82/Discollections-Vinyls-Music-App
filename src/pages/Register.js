/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../logic/AuthUser';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [empties, setEmpties] = useState('');

  const history = useHistory();

  const submittedForm = async (e) => {
    e.preventDefault();
    setEmpties('');

    if (!email || !password) {
      setEmpties('Please complete the fields');
      return;
    }

    const result = await registerUser(email, password);
    return result.correct ? history.push('/') : setEmpties(result.message);
  };


  return (
    <div>
      <h1>USER REGISTER</h1>
      <form onSubmit={submittedForm}>
        <div>
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">REGISTER</button>
      </form>
      <Link to="/">
        <button type="button">GO BACK</button>
      </Link>
      {empties !== '' && <span>{empties}</span>}
    </div>
  );
};

export default Register;
