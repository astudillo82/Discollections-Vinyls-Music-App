import React, { useState, useEffect } from 'react';
import { posts, newPost, deletePost } from '../../services/firestoreData';

const Comments = () => {debugger
  const [getPosts, setGetPosts] = useState([]);

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [update, setUpdate] = useState(false);


  useEffect(() => {
  const fetch = async () => {
      const databasePosts = await posts();
      setGetPosts(databasePosts);
  };
  fetch();
  }, []);

  const postSubmit = (e) => {
    e.preventDefault()
    const createPost = {
      title,
      name,
      comment
    }   
   newPost(createPost);    
  };

  const deletePostSubmit = async() => {
    const result = await deletePost()
    return result;
  }

  return (  
  <div>
    <div>              
      <div>
        <label htmlFor='title'>Title</label>
        <input  value={title} placeholder='title' onChange={(e) => setTitle(e.target.value)} />          
      </div>

      <div>
        <label htmlFor='title'>Name</label>
        <input type="name" value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />          
      </div>

      <div>
        <label htmlFor='title'>Content</label>
        <textarea  type="comments" value={comment} placeholder='content' onChange={(e) => setComment(e.target.value)} />          
      </div>
        <button type="submit" onClick={postSubmit}>New Post</button>            
    </div> 

    <div>
      {getPosts.map((elem) =>(
        <div className="posts" key={elem.id}>              
          <h1>{elem.title}</h1>        
          <h2>{elem.name}</h2>
          <h3>{elem.comment}</h3>
          <button onClick={deletePostSubmit}>DELETE</button>
        </div>
        ))}
    </div>
  </div>
  );
};

export default Comments;

// {update ?  
//   <div>          
//     <input value={title} onChange={(e) => setUpdate(e.target.value)} /> 
//     <button onClick={updateTitle}>Update</button>                      
//   </div>                       
//   : <h1 onClick={() => setUpdate(true)}>{elem.title}</h1>
//   }

// const updateTitle =  async (e) => {
//   e.preventDefault(); 
//   const result = await updatePost()
//   if(result){
//     setUpdate(false)      
//   }
// }