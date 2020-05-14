/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOutUser } from '../../logic/AuthUser';
import LogicMusic from '../../logic/LogicMusic';
import AlbumResults from '../AlbumResults';
import Footer from '../Footer';
import homeImage from '../../images/home-background.jpg';
import './Home.scss';

const Home = () => {
  const user = useSelector((state) => state.user);
  const [results, setResults] = useState({});
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');

  const getArtist = async () => {
    if (input !== '') {
      const newArtist = await LogicMusic.takeFindArtist(input);
      setResults(newArtist);
    } else {
      const newArtist = await LogicMusic.takeHomeArtist();
      setResults(newArtist);
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  // eslint-disable-next-line no-shadow
  const getUrl = async (url) => {
    const response = await LogicMusic.takeSearchFromUrl(url);
    setResults(response);
  };

  useEffect(() => {
    getUrl(url);
  }, [url]);

  const history = useHistory();
  const SignOut = async () => {
    const result = await signOutUser();
    return result ? history.push('/') : false;
  };

  return (
    <div className="home-page">
      {user ? (
        <nav className="nav">
          <h1 className="nav__title">DISCOLLECTION VINYLS MUSIC APP</h1>
          <form className="form">
            <input type="text" id="text" value={input} className="input__name" placeholder="Write artist..." onChange={(e) => setInput(e.target.value)} />
            <button className="input__button" type="button" onClick={getArtist}>SEARCH</button>
          </form>
          <Link to="/favorites">
            <button className="favorites__button" type="button">SEE FAVORITES</button>
          </Link>
          <Link onClick={SignOut} to="/">SIGN OUT</Link>
        </nav>
      ) : (null)}
      <div className="results">
        {results.results && results.results.map((elem) => <AlbumResults key={elem.id} item={elem} />)}
      </div>
      <div className="buttons">
        <button className="buttons__prev" type="button" onClick={() => setUrl(results.pagination.urls.prev)}>PREV</button>
        <button className="buttons__next" type="button" onClick={() => setUrl(results.pagination.urls.next)}>NEXT</button>
      </div>
      <div className="background">
        <img src={homeImage} alt="home-brackground" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
