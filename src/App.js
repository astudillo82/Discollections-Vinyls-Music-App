import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import * as firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';

import Main from './components/Main';
import Home from './components/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { registerAuthObserver } from './logic/AuthUser';

firebase.initializeApp(firebaseConfig);


function App() {
  useEffect(() => {
    registerAuthObserver((user) => user);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/welcome" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;