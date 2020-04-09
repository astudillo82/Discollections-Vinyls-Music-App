import signUp from '../services/signUp';
import logIn from '../services/logIn';
import authObserver from '../services/authObserver';
import signOut from '../services/signOut';

export const registerUser = async (email, password) => {
  const result = await signUp(email, password);
  if (result.correct) return { correct: true };
  return { correct: false, message: result.message };
};

export const logInUser = async (email, password) => {debugger
  const result = await logIn(email, password);
  if (result.correct) return { correct: true };
  return { correct: false, message: result.message };
};

export const registerAuthObserver = (callback) => {
  authObserver(callback);
};

export const signOutUser = async () => {
  const result = await signOut();
  return result.correct;
};

export default {
  registerUser,
  logInUser,
  registerAuthObserver,
  signOutUser,
};
