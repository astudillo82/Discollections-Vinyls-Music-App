import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addFavs } from '../../services/firestoreData';
import { userById } from '../../logic/AuthUser';
import LogicMusic from '../../logic/LogicMusic';
import Comments from '../Comments';
import Footer from '../Footer';
import setUser from '../../redux/actions/userActions';

import notFoundImage from '../../images/404.png';
import detailImage from '../../images/detail-background.jpg';
import './AlbumDetails.scss';

const AlbumDetails = () => {
  const user = useSelector((state) => state.user);
  const [details, setDetails] = useState({});
  const { albumId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

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

  // ADD FAVORITES
  const addFavSubmit = async (e) => {
    e.preventDefault();
    const result = await addFavs('profile', user.id, {
      image: uri150,
      name,
      title,
      year,
      albumId,
    });

    if (result) {
      const profile = await userById(user.id);
      dispatch(setUser(profile));
      history.push('/favorites');
    }
    // return result ? history.push('/favorites') : false;
  };

  return (
    <div>
      <div className="box">
        <div className="album-details">
          <h1>ALBUM DETAILS</h1>
          <img src={uri150 || notFoundImage} alt="title" className="artist_cover" title={title} />
          <button type="submit" onClick={addFavSubmit}>ADD FAVORITE LISTS</button>
        </div>

        <div className="details">
          <p className="title">ARTIST: </p>
          <p className="content">{name}</p>
          <p className="title"> TITLE:</p>
          <p className="content">{title}</p>
          <p className="title"> STYLES:</p>
          <p className="content">{styles || 'unstyled'}</p>
          <p className="title"> YEAR:</p>
          <p className="content">{year}</p>
          <p className="title"> GENRE:</p>
          <p className="content">{genres}</p>
        </div>
      </div>

      <div className="tracklist">
        <br />
        <h2>TRACKLIST</h2>
        <br />
        {details.tracklist && details.tracklist.map((elem) => {
          return <p key={elem.id}>{elem.position} - {elem.title} - {elem.duration} </p>;
        })}
      </div>
      <br />
      <div className="background">
        <img src={detailImage} alt="detail-brackground" />
      </div>
      <Comments albumId={albumId} />
      <Footer />
    </div>
  );
};

export default AlbumDetails;
