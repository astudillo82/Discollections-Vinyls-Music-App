import * as firebase from 'firebase/app';

async function signUp(email, password) {
  try {
    const result = firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(result)
    return !result;
  } catch (error) {
    return false;
  }
}

export default signUp;
