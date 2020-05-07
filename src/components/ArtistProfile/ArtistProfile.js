import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LogicMusic from '../../logic/LogicMusic';
import Footer from '../Footer';
import ProfileImage from '../../images/profile-background.jpg';
import './ArtistProfile.scss';

const ArtistProfile = () => {
  const [profile, setProfile] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const getProfile = async () => {
    const newProfile = await LogicMusic.takeArtistProfile(id);
    setProfile(newProfile);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const { images: [{ uri } = {}] = [] } = profile;

  return (
    <div className="profile">

      <nav className="nav">
        <h1 className="nav__title">ARTIST PROFILE</h1>
        <button className="nav__button" type="button" onClick={() => history.goBack()}>GO BACK ALBUM DETAILS</button>
      </nav>


      <div className="main">
        <img src={uri} alt="name" className="main__image" title={profile.name} />

        <div className="content">
          <h1 className="content__name">{profile.name}</h1>
          <div className="content__members">
            {profile.members && profile.members.map((elem) => <p key={elem.id}>{elem.active ? 'Current Member' : 'Past Member'}-{elem.name}</p>)}
          </div>
        </div>
      </div>

      <div className="biography">
        <p className="biography__main">BIOGRAPHY: {profile.profile || 'UNKNOWN'}</p>
      </div>

      <div className="links">
        <h2 className="links__title">FOLLOW THEM...</h2>
        {profile.urls && profile.urls.map((url) => <p key={url.id} className="links__links">{<a href={url} target="_blank" rel="noopener noreferrer">{url}</a>}</p>)}
      </div>

      <div className="background">
        <img className="background__image" src={ProfileImage} alt="profile.name" />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default ArtistProfile;
