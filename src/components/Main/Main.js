import React from 'react';
import { Link } from 'react-router-dom';
import './Main.scss';
import image from '../../images/main-background.jpg'

const Main = () => {
  return (
    <div className="main-page">
      <h1 className="main-page title">DISCOLLECTION VINYLS MUSIC APP</h1>
      <div className="main-page links">
        <li className="main-page register"><Link to="/register">Register</Link></li>
        <li className="main-page login"><Link to="/Login">Log In</Link></li>
      </div>
      <img className="main-page background" src={image} />
    </div>
  );
};

export default Main;
 