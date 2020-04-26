import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { myFavs, deleteFavs } from '../../services/firestoreData';
import LogicMusic from '../../logic/LogicMusic';
import Comments from '../Comments';

import notFoundImage from '../../images/404.png';
import './AlbumDetails.scss';

const AlbumDetails = () => {
  const user = useSelector((state) => state.user);
  const [details, setDetails] = useState({});
  const { albumId } = useParams();

  const getDetails = async () => {
    const newDetails = await LogicMusic.takeAlbumDetails(albumId);
    setDetails(newDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const {
    images: [{ uri150 } = {}] = [],
    artists: [{ name } = {}] = [],
    title,
    year,
    styles,
    genres,
  } = details;

  const addFavSubmit = (e) => {
    e.preventDefault();
    myFavs('profiles', user.id, {
      image: uri150,
      name,
      title,
      year,
      albumId,
    });
  };

  const handleDeleteFavorite = (e) => {
    e.preventDefault();
    deleteFavs('profiles', user.id, {
      image: uri150,
      name,
      title,
      year,
      albumId,
    });
  };


  return (
    <div>
      <div className="album-details">
        <h1>ALBUM DETAILS</h1>
        <img src={uri150 || notFoundImage} alt="title" className="artist_cover" title={title} />
        <button type="submit" onClick={addFavSubmit}>ADD FAVORITE LISTS</button>
        <button type="button" onClick={handleDeleteFavorite}>DELETE FAVORITE</button>
        <div className="details">
          <p className="title">ARTIST: </p>
          <p className="content">{name}</p>
          <p className="title"> TITLE:</p>
          <p className="content">{title}</p>
          <p className="title"> STYLES:</p>
          <p className="content">{styles}</p>
          <p className="title"> YEAR:</p>
          <p className="content">{year}</p>
          <p className="title"> GENRE:</p>
          <p className="content">{genres}</p>
        </div>

        <div className="tracklist">
          <br />
          <h2>TRACKLIST</h2>
          <br />
          {details.tracklist && details.tracklist.map((elem) => {
            return (
              <p key={elem.id}>{elem.position} - {elem.title} - {elem.duration} </p>
            );
          })}
        </div>
        <br />
      </div>
      <Comments albumId={albumId} />
    </div>
  );
};

export default AlbumDetails;
