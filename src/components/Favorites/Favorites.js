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


    // const newFavorites = user.favorites.filter((item) => item !== elem);
    // return newFavorites;


    // calcular el nuevo array del favoritos del usuario quitando elem de user.favorites
    // const newFavorites = calcular favorites, user.favorites, filter
    // setear en redux la nueva información del usuario reemplazando el array de favoritos por el que se acaba de calcular

    // dispatch(setUser({...user, favorites: newFavorites}));


    // const unsubscribed = favSnapShot('profiles', user.favorites, user.id);
    // return () => unsubscribed();
  };

  return (
    <div className="favorites">
      <h1>YOUR CUSTOM FAVORITE LIST</h1>

      <Link to="/home">
        <button className="go_back-button" type="button">GO BACK HOME</button>
      </Link>

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
      <Footer />
    </div>
  );
};

export default Favorites;
