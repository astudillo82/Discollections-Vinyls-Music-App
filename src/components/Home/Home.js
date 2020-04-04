/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { signOutUser } from '../../logic/AuthUser';
import ItemArtist from '../AlbumResults';
import LogicMusic from '../../logic/LogicMusic';

const Home = () => {
  const [results, setResults] = useState({});
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');


  const getArtist = async () => {
    // const newArtist = await LogicMusic.takeFindArtist(input);(CHECK!!!)
    const newArtist = await LogicMusic.takeHomeArtist();
    setResults(newArtist);
  };

  useEffect(() => {
    getArtist();
  }, []); // NO QUITAR [], EVITA ERROR 429


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
    <div>
      <h1>DISCOLLECTION VINYLS MUSIC APP</h1>

      <Link onClick={SignOut} to="/">SIGN OUT</Link>

      <div>
        <div>
          <label>
            <input type="text" id="text" value={input} placeholder="Search Artist" onChange={(e) => setInput(e.target.value)} />
          </label>
        </div>
        <button type="button" onClick={getArtist}>SEARCH</button>
      </div>


      <div className="group">
        {results.results && results.results.map((elem) => <ItemArtist key={elem.id} item={elem} />)}
      </div>

      <div className="page-button">
        <button type="button" className="prev-page" onClick={() => setUrl(results.pagination.urls.prev)}>PREV</button>
        <button type="button" className="next-page" onClick={() => setUrl(results.pagination.urls.next)}>NEXT</button>
      </div>
    </div>
  );
};

export default Home;
