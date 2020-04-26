import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import firebaseConfig from './firebaseConfig';
import { registerAuthObserver, userById } from './logic/AuthUser';

import Main from './components/Main';
import Home from './components/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import AlbumDetails from './components/AlbumDetails/AlbumDetails';
import PostDetails from './components/PostDetails/PostDetails';

import setUser from './redux/actions/userActions';
import AddFavorites from './components/AddFavorites';

firebase.initializeApp(firebaseConfig);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    registerAuthObserver(async (user) => {
      if (user) {
        const profiles = await userById(user.uid);
        dispatch(setUser(profiles));
      } else {
        dispatch(setUser(null));
        console.log('User is logout..');
      }
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/favorites" component={AddFavorites} />
        {/* <Route exact path="/album/:albumId" component={AlbumDetails} /> */}
        <Route exact path="/album/:albumId" component={AlbumDetails} />
        <Route exact path="/album/post/:postId" component={PostDetails} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
