import React, { useState, useEffect } from 'react';
import { posts, newPost } from '../../services/firestoreData';
import { Link } from 'react-router-dom';

const Comments = ({id}) => {
  const [getPosts, setGetPosts] = useState([]);

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');


  useEffect(() => {
  const fetch = async () => {
      const databasePosts = await posts(id);
      setGetPosts(databasePosts);
  };
  fetch();
  }, []);

  const postSubmit = (e) => {debugger
    e.preventDefault()
    const createPost = {
      title,
      name,
      comment,
      id            
    }   
   newPost(createPost);    
  };

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
          <h1><Link to={`/album/post/${elem.id}`}>{elem.title}</Link></h1>        
          <h2>{elem.name}</h2>
          <h3>{elem.comment}</h3>
          <p>{elem.id}</p>          
        </div>
        ))}
    </div>
  </div>
  );
};

export default Comments;

