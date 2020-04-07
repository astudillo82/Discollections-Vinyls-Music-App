import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';

import Main from './components/Main';
import Home from './components/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { registerAuthObserver } from './logic/AuthUser';
import AlbumDetails from './components/AlbumDetails/AlbumDetails';
import PostDetails from './components/PostDetails/PostDetails';


firebase.initializeApp(firebaseConfig);


function App() {
  useEffect(() => {
    registerAuthObserver((user) => user);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/album/:_albumId" component={AlbumDetails} />
        <Route exact path="/album/post/:post_id" component={PostDetails} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App; 
