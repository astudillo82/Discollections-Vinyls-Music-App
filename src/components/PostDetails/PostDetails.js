import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { postById, updatePost } from '../../services/firestoreData'

const PostDetails = () => {
  const { post_id } = useParams();
  const [postId, setPostId] = useState('')

  const [edit, setEdit] = useState(false);
  const [change, setChange] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const id = await postById(post_id)
      setChange({target:{value:postId.comment}})
      setPostId(id);      
    }
    fetch();
  },[])

  const history = useHistory();

  const updatePostComment = async (e) => {
      e.preventDefault()
      const result = await updatePost(post_id, change)
      return result ? history.push('/home') : setChange('the field is empty');
  }

  return (
    <div>
      <div>
        <h1>{postId.title}</h1>
        <p>{postId.name}</p>
        {edit ?
          <div>
              <form onSubmit={updatePostComment}>
                <input value={change.value} onChange={(e)=>setChange(e.target.value)} onBlur={updatePostComment}/>
                <button>UPDATE COMMENTS</button>
              </form>
          </div> : 
          <p onClick={()=>{setEdit(true)}}>{postId.comment}</p>
        }
        <p>{postId.id}</p>
      </div>
    </div>   
  );
}; 

export default PostDetails;