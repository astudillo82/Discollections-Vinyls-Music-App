import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFavs } from '../../services/firestoreData';
import { userById } from '../../logic/AuthUser';
import Footer from '../Footer';
import favoriteImage from '../../images/favorites-background.jpg';
import setUser from '../../redux/actions/userActions';
import './Favorites.scss';


const Favorites = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDeleteFavorite = async (elem) => {
    const result = await deleteFavs('profile', user.id, elem);
    if (result) {
      const profile = await userById(user.id);
      dispatch(setUser(profile));
      history.push('/favorites');
    }
  };

  return (
    <div>
      <div className="favorites">
        <nav>
          <Link to="/home">
            <button className="go_back-button" type="button">GO BACK HOME</button>
          </Link>
          <div className="center">
            <h1 className="title">YOUR CUSTOM FAVORITE LIST</h1>
            <h3>USER: {user.name} </h3>
          </div>
          <button className="go_back-button" type="button" onClick={() => history.goBack()}>GO BACK ALBUM DETAILS</button>
        </nav>

        <div className="favorites-results">
          {user.favorites && user.favorites.map((elem, item) => {
            return (
              <div className="favs" key={item}>
                <div>
                  <img src={elem.image} alt="title" className="artist_cover" title={elem.title} />
                  <br />
                  <Link to={`/album/${elem.albumId}`}>{elem.title}</Link>
                  <p>{elem.name}</p>
                  <button type="button" onClick={() => handleDeleteFavorite(elem)}>DELETE FAVORITE</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="background">
          <img src={favoriteImage} alt="favorite-brackground" />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Favorites;
