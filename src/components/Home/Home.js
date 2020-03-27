import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { signOutUser } from '../../logic/AuthUser';

const Home = () => {
  const history = useHistory();

  const SignOut = async () => {
    const result = await signOutUser();
    return result ? history.push('/') : false;
  };

  return (
    <div>
      <h1>WELCOME TO YOUR PROYECT</h1>
      <Link onClick={SignOut} to="/">SIGN OUT</Link>
    </div>
  );
};

export default Home;
