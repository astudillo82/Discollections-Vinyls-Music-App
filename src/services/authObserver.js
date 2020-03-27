import * as firebase from 'firebase';

function authObserver(callback) {
  firebase.auth().onAuthStateChanged(callback);
}

export default authObserver;
