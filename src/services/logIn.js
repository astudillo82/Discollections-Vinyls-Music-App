import * as firebase from 'firebase';

async function logIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return { correct: true };
  } catch (error) {
    return { correct: false, message: error.message };
  }
}

export default logIn;
