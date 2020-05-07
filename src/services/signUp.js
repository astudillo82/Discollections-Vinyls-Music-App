import * as firebase from 'firebase';

async function signUp(email, password) {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return { correct: true, id: result.user.uid };
  } catch (error) {
    return { correct: false, message: error.message };
  }
}

export default signUp;
