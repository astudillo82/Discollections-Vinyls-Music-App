import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { postById, updatePost } from '../../services/firestoreData';

const PostDetails = () => {
  const { postId } = useParams();

  const [postData, setPostData] = useState('')
  const [edit, setEdit] = useState(false);
  const [change, setChange] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const post = await postById(postId)
      setChange(postData.comment)
      setPostData(post);      
    }
    fetch();
  },[])

  const history = useHistory();

  const updatePostComment = async (e) => {
      e.preventDefault()
      const result = await updatePost(postId, change)     
      history.goBack ();      
  }

  return (
    <div>
      <div>
        <h1>{postData.title}</h1>
        <p>{postData.name}</p>
        {edit ?
          <div>
              <form onSubmit={updatePostComment}>
                <input value={change} onChange={(e)=>setChange(e.target.value)} />
                <button>UPDATE COMMENTS</button>
              </form>
          </div> : 
          <p onClick={()=>{setEdit(true)}}>{postData.comment}</p>
        }
        <p>{postData.id}</p>
      </div>
    </div>   
  );
}; 

export default PostDetails;