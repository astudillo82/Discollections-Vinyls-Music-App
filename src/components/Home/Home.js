/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { signOutUser } from '../../logic/AuthUser';
import { useSelector } from 'react-redux'

import LogicMusic from '../../logic/LogicMusic';
import AlbumResults from '../AlbumResults';
import homeImage from '../../../src/images/home-background.jpg'
import './Home.scss';
import AddFavorites from '../AddFavorites';


const Home = () => {
  const user = useSelector(state=>state.user)
  const [results, setResults] = useState({});
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');

  const [add, setAdd]= useState(false)

  const getArtist = async () => {
    if(input !== ''){
      const newArtist = await LogicMusic.takeFindArtist(input);
      setResults(newArtist);
    } else {
        const newArtist = await LogicMusic.takeHomeArtist();
        setResults(newArtist);
    } 
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
    <div className="home-page">  
      {user ? (     
      <nav>    
        <h1>DISCOLLECTION VINYLS MUSIC APP</h1>       
          <div className="search-artist">          
              <input type="text" id="text" value={input} placeholder="Write artist..." onChange={(e) => setInput(e.target.value)} />         
              <button className="search-button" type="button" onClick={getArtist}>SEARCH</button>
              {add && <AddFavorites/>}
              <div>
                <Link to={'/favorites'} onClick={() => setAdd(true)}>
                    <button>SEE FAVORITES</button>
                </Link>
              </div>
              
          </div>    
           <Link onClick={SignOut} to="/">SIGN OUT</Link>
      </nav>
       ) : ( null )}
      <div className="album-results">
        {results.results && results.results.map((elem) => <AlbumResults key={elem.id} item={elem} />)}
      </div>
     
      <div className="buttons">
        <button className="prev-button" type="button" className="prev-page" onClick={() => setUrl(results.pagination.urls.prev)}>PREV</button>
        <button className="next-button" type="button" className="next-page" onClick={() => setUrl(results.pagination.urls.next)}>NEXT</button>
      </div>
      <div className="background">
        <img src={homeImage} alt="home-brackground"/>
      </div>
    </div>    
  );
};

export default Home;
 