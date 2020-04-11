import * as firebase from 'firebase/app';
import 'firebase/firestore';
const db = () =>  firebase.firestore();


//SAVING DATA (FIRESTORE DATABSE)
const newPost = async  (createPost) => {
  const database = db ();

  try {
    const results = await database.collection('posts').add(createPost);     
    return results.id
  } catch(error){
    return null
  } 
}

//GETTING(READING) DATA
const posts = async (comment_id) => {
  const database = db ();

  const querySnapshot = await database.collection('posts').where('id','==', comment_id).get();
  const allPost = [];
  querySnapshot.forEach((doc) => {
    allPost.push({ 
      id: doc.id,
      ...doc.data(),
    });
  });
  return allPost;  
}; 

//GET POST BY ID
const postById = async (id) => {  
  const database = db ();
  const results = await database.collection('posts').doc(id).get()
  return results.exists ? { id, ...results.data() } : null;
} 


//UPDATE POST
const updatePost = async (id,comment) => {
    const database = db ();
    const results = await database.collection('posts').doc(id).update({comment});
    return typeof results === 'undefined';
}

//DELETE POST
// const deletePost = async (id) => {
//   const database = db ();
//   const results = await database.collection('posts').doc(id).delete();
//   return typeof results === 'undefined';
// }


export {
    posts,
    newPost,
    postById,
    updatePost,
    
}
 