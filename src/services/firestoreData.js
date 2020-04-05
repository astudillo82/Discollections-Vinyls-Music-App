import * as firebase from 'firebase/app';
import 'firebase/firestore';
const db = () =>  firebase.firestore();

//GETTING DATA
const posts = async () => {debugger
  const database = db();

  const snapshot = await database.collection('posts').get();
  const allPost = [];
  snapshot.forEach((doc) => {
    allPost.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return allPost;  
};

//SAVING DATA
const newPost = async  (createPost) => {
  const database = db();

  try {
    const results = await database.collection('posts').add(createPost);     
    return results.id
  } catch(error){
    return null
  }
}

//UPDATE
const updatePost = async (id,title) => {
    const database = db();
    const results = await database.collection('posts').doc(id).update({title});
    return results === 'undefined';
}

const deletePost = async (id) => {
  const database = db();
  const results = await database.collection('posts').doc(id).delete();
  return typeof results === 'undefined';
}


export {
    posts,
    newPost,
    updatePost,
    deletePost,
}
 