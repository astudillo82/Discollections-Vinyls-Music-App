import React, { useState, useEffect } from 'react';
import { posts, newPost } from '../../services/firestoreData';
import { Link, useHistory } from 'react-router-dom';
import './Comments.scss';


const Comments = ({comment_id}) => {
  const [getPosts, setGetPosts] = useState([]);

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');


  useEffect(() => {
  const fetch = async () => {
      const databasePosts = await posts(comment_id);
      setGetPosts(databasePosts);
  };
  fetch();
  }, []);

  const history = useHistory();

  const postSubmit = (e) => {debugger
    e.preventDefault()
    const createPost = {
      title,
      name,
      comment,
      comment_id
    }    
   newPost(createPost); 
  };

  return (  
  <div>
    <div className="comments">              
        <h1>ADD A REVIEW</h1><br/>
      <div>
        <label htmlFor='title'/>
        <input value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />          
      </div>

      <div>
        <label htmlFor='title'/>
        <input type="name" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />          
      </div>

      <div>
        <label htmlFor='title'/>
        <textarea type="comments" value={comment} placeholder='Write your review here...' onChange={(e) => setComment(e.target.value)} />          
      </div>
        <button type="submit" onClick={postSubmit}>Add Review</button> 
        <Link to="/home">
            <button className="go_back-button" type="button">GO BACK</button>
        </Link>           
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

