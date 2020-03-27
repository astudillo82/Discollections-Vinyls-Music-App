import * as firebase from 'firebase';

async function signOut() {
  try {
    await firebase.auth().signOut();
    return { correct: true };
  } catch (error) {
    return { correct: false, message: error.message };
  }
}

export default signOut;
