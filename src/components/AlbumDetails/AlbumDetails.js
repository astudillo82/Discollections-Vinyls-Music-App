import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
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
    images: [{ uri } = {}] = [],
    artists: [{ name, id } = {}] = [],
    title,
    year,
    styles,
    genres,
  } = details;

  const addFavSubmit = async (e) => {
    e.preventDefault();
    const result = await addFavs('profile', user.id, {
      image: uri,
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
  };

  return (
    <div>
      <div className="album-details">
        <nav className="nav">
          <h1 className="nav__title">ALBUM DETAILS</h1>
          <h2 className="nav__user">USER: {user.name} </h2>
          <Link to="/home">
            <button className="nav__button" type="button">GO BACK HOME</button>
          </Link>
        </nav>
        <div className="main">
          <div className="center">
            <img src={uri || notFoundImage} alt="title" className="center__image" title={title} />
          </div>
          <div className="details">
            <p className="details__title">ARTIST: </p>
            <p className="details__content">{name}</p>
            <p className="details__title"> TITLE:</p>
            <p className="details__content">{title}</p>
            <p className="details__title"> STYLES:</p>
            <p className="details__content">{styles || 'unknown'}</p>
            <p className="details__title"> YEAR:</p>
            <p className="details__content">{year || 'unknown'}</p>
            <p className="details__title"> GENRE:</p>
            <p className="details__content">{genres}</p>
            <div className="button">
              <button type="submit" className="button__favorite button-style" onClick={addFavSubmit}>ADD FAVORITE LISTS</button>
              <Link to={`/artist/profile/${id}`}>
                <button className="button__link button-style" type="button">ARTIST PROFILE</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="tracklist">
          <h2 className="tracklist__title">TRACKLIST</h2>
          <div className="tracklist__songs">
            {details.tracklist && details.tracklist.map((elem) => {
              return <p key={elem.id}>{elem.position} - {elem.title} - {elem.duration} </p>;
            })}
          </div>
        </div>
        <div className="background">
          <img src={detailImage} alt="detail-brackground" />
        </div>
      </div>
      <Comments albumId={albumId} />
      <Footer />
    </div>
  );
};

export default AlbumDetails;
