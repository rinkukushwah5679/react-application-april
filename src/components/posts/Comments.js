import React, {useEffect, useState } from 'react';
import { BASE_URL, getCurrentUser } from '../../config';
import axios from 'axios';
import './CommentForm.css';

const PostComments = ({postId, isModal}) => {
	console.log(`${BASE_URL}/comments/${postId}`)
	const currentUser = getCurrentUser();
	const [error, setIsError] = useState(null);
	const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

	const Comments = async () => {
    try {
    	const headers = {
        Authorization: `Bearer ${currentUser.authentication_token}`,
      };
      const res = await axios.get(`${BASE_URL}/comments/${postId}`, { headers });
      setComments(res.data.data);
      setIsError(null);
    } catch (error) {
    	if (error.response.status === 422) {
    		setIsError(error.response.data.errors);
    	}
    	else {
	      setIsError(error.message);
    	}
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${currentUser.authentication_token}`,
      };
      const res = await axios.post(`${BASE_URL}/comment`, {
        post_id: postId,
        comment: newComment,
      }, { headers });
      // Comments();
      setComments([res.data.data, ...comments ]);
      setNewComment('');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setIsError(error.response.data.errors);
      } else {
        setIsError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
      { isModal && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.message}</p>
        </div>
      ))}
    </div>
	)
}

export default PostComments;