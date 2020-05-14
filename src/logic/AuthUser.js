import signUp from '../services/signUp';
import logIn from '../services/logIn';
import authObserver from '../services/authObserver';
import signOut from '../services/signOut';
import { newOneWithId, postById } from '../services/firestoreData';


export const registerUser = async (name, email, password, favorites = []) => {
  const result = await signUp(email, password);
  if (result.correct) {
    const profiles = await newOneWithId('profile', { name, email, favorites }, result.id);
    return { correct: profiles };
  }
  return { correct: false, message: 'Please complete the fields' };
};

export const logInUser = async (email, password) => {
  const result = await logIn(email, password);
  if (result.correct) return { correct: true };
  return { correct: false, message: 'Incorrect email and/or Password.' };
};

export const registerAuthObserver = (callback) => {
  authObserver(callback);
};

export const userById = async (id) => {
  const result = await postById('profile', id);
  return result;
};

export const signOutUser = async () => {
  const result = await signOut();
  return result.correct;
};

export default {
  registerUser,
  logInUser,
  registerAuthObserver,
  userById,
  signOutUser,
};
