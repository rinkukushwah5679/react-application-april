import React, {useEffect, useState } from 'react';
import { BASE_URL, getCurrentUser } from '../../config';
import axios from 'axios';

const PostComments = ({postId}) => {
	console.log(`${BASE_URL}/comments/${postId}`)
	const currentUser = getCurrentUser();
	const [error, setIsError] = useState(null);
	const [comments, setComments] = useState([]);
	const Comments = async () => {
    try {
    	const headers = {
        Authorization: `Bearer ${currentUser.authentication_token}`,
      };
      const res = await axios.get(`${BASE_URL}/comments/${postId}`, { headers });
      setComments(res.data.data);
    } catch (error) {
    	if (error.response.status === 422) {
    		setIsError(error.response.data.errors);
    	}
    	else {
	      setIsError(error.message);
    	}
    }
  }
	useEffect(() => {
		Comments();
	}, [postId])
	return (
		<div className="comments-section">
      <h3>Comments</h3>
      {error && 
      	<div className="comment">
          <p>{error}</p>
        </div>
    	}
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.message}</p>
        </div>
      ))}
    </div>
	)
}

export default PostComments;