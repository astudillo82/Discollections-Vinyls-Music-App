import * as firebase from 'firebase/app';
import 'firebase/firestore';

const db = () => firebase.firestore();

// POSTS
// SAVING DATA (FIRESTORE DATABASE)
const newPost = async (reviews, createPost) => {debugger
  const database = db();

  try {
    const results = await database.collection(reviews).add(createPost);
    return results.id;
  } catch (error) {
    return null;
  }
};

// ONSNAPSHOP(REAL-TIME)
const getSnapShot = (reviews, callback, albumId) => {
  const database = db();

  return database.collection(reviews)
    .where('albumId', '==', albumId)
    .onSnapshot((querySnapshot) => {
      const allPost = [];
      querySnapshot.forEach((doc) => {
        allPost.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(allPost);
    });
};


// UPDATE FAVORITES
const addFavs = async (profile, id, { image, name, title, year, albumId }) => {
  const database = db();

  try {
    const results = await database.collection(profile).doc(id)
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(
          { image, name, title, year, albumId })});
    return typeof results === 'undefined';
  } catch (error) {
    return null;
  }
};

// DELETE FAVORITES
const deleteFavs = async (profile, id,{ image, name, title, year, albumId }) => {
  const database = db();
  try {
    const results = await database.collection(profile).doc(id)
      .update({
        favorites: firebase.firestore.FieldValue.arrayRemove(
          { image, name, title, year, albumId })});
    return typeof results === 'undefined';
  } catch (error) {
    return null;
  }
};


// GET POST BY ID
const postById = async (reviews, id) => {
  const database = db();
  const results = await database.collection(reviews).doc(id).get();
  return results.exists ? { id, ...results.data() } : null;
};

// UPDATE POST
const updatePost = async (reviews, id, { updateTitle, updateComment, updateImage }) => {
  const database = db();
  const results = await database.collection(reviews).doc(id).update(
    { title: updateTitle, comment: updateComment, image: updateImage });
  return typeof results === 'undefined';
};

// CREATE NEW WITH ID
const newOneWithId = async (reviews, createPost, id) => {
  const database = db();
  try {
    const results = await database.collection(reviews).doc(id).set(createPost);
    return typeof results === 'undefined';
  } catch (error) {
    return null;
  }
};

// DELETE POST
const deletePost = async (reviews, id) => {
  const database = db();
  const results = await database.collection(reviews).doc(id).delete();
  return typeof results === 'undefined';
};


export {
  newPost,
  getSnapShot,
  newOneWithId,
  postById,
  updatePost,
  addFavs,
  deletePost,
  deleteFavs,
};
