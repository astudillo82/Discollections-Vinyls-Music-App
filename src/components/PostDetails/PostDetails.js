import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { postById, updatePost } from '../../services/firestoreData';

const PostDetails = () => {
  const { postId } = useParams();
  const history = useHistory();

  const [postData, setPostData] = useState('');
  const [edit, setEdit] = useState(false);
  const [change, setChange] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const post = await postById('posts', postId);
      setChange(postData.comment);
      setPostData(post);
    };
    fetch();
  }, []);

  const updatePostComment = async (e) => {
    e.preventDefault();
    const result = await updatePost('posts', postId, change);
    return result ? history.goBack() : false;
  };

  return (
    <div>
      <div>
        <h1>{postData.title}</h1>
        {/* {edit ?
          <div>
              <form onSubmit={updatePostComment}>
                <input value={change} onChange={(e)=>setChange(e.target.value)} />
                <button>UPDATE TITLE</button>
              </form>
          </div> :
          <p onClick={()=>{setEdit(true)}}>{postData.title}</p>
        } */}

        <p>{postData.user}</p>

        {edit ? (
          <div>
            <form onSubmit={updatePostComment}>
              <input value={change || ''} onChange={(e) => setChange(e.target.value)} />
              <button type="button">UPDATE COMMENTS</button>
            </form>
          </div>
        )
          : <p onClick={() => {setEdit(true) }}>{postData.comment}</p>}
        {/* <p>{postData.id}</p> */}
      </div>
    </div>
  );
};

export default PostDetails;