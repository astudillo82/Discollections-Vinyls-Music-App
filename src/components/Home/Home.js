/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { signOutUser } from '../../logic/AuthUser';
import ItemArtist from '../ItemArtist';
import LogicMusic from '../../logic/LogicMusic';
import Pagination from '../Pagination';

const Home = () => {
  const [artist, setArtist] = useState([]);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(25);

  const getArtist = async () => {
    // e.preventDefault();
    const newArtist = await LogicMusic.takeSearchArtist(page, perPage);
    setArtist(newArtist);
  };

  useEffect(() => {
    getArtist();
  });

  const history = useHistory();

  const SignOut = async () => {
    const result = await signOutUser();
    return result ? history.push('/') : false;
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <h1>DISCOLLECTION VINYLS MUSIC APP</h1>

      <Link onClick={SignOut} to="/">SIGN OUT</Link>

      <form onSubmit={getArtist}>
        <div>
          <label>
            <input type="text" id="text" value={input} placeholder="Search Artist" onChange={(e) => setInput(e.target.value)} />
          </label>
        </div>
        <button type="submit">SEARCH</button>
      </form>

      <div className="group">
        {artist.map((elem) => {
          return <ItemArtist key={elem.id} item={elem} />;
        })}
      </div>

      <div className="page-button">
        <Pagination page={page} nextPage={nextPage} prevPage={prevPage} />
      </div>
    </div>
  );
};

export default Home;
