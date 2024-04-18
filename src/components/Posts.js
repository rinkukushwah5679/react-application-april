import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "../Posts.css";
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';


export default function Posts() {
  const navigate = useNavigate();
  const [posts, setMyPosts] = useState([]);
  const [isError, setIsError] = useState("");

  const getApiData = async () => {
    try {
      let user_data = localStorage.getItem('login_user');
      const user1 = JSON.parse(user_data);
      if (user1 === null) {
        navigate('/login');
        return; // Exit early if user is not logged in
      }

      const headers = {
        Authorization: `Bearer ${user1.authentication_token}`,
      };
      const res = await axios.get(`${BASE_URL}/blogs`, { headers });

      if (res.status === 200) {
        setMyPosts(res.data.data);
      } else {
        console.error(`Unexpected status code: ${res.status}`);
      }
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const handleLike = async (postId, urlType) => {
    try {
      const user_data = localStorage.getItem('login_user');
      const user1 = JSON.parse(user_data);
      if (user1 === null) {
        navigate('/login');
        return; // Exit early if user is not logged in
      }

      const headers = {
        Authorization: `Bearer ${user1.authentication_token}`,
      };

      const like_type = urlType;

      const res = await axios.post(`${BASE_URL}/${urlType}/${postId}`, {}, { headers });
      if (res.status === 200) {
        const updatedPosts = posts.map(post => {
          if (post.id === postId) {
            return { ...post, liked: !post.liked, likes_count: (urlType == 'unlike' ? (post.likes_count - 1) : (post.likes_count + 1)) }; // Update the post with the new like status and count
          }
          return post;
        });
        setMyPosts(updatedPosts);
      } else {
        console.error(`Unexpected status code: ${res.status}`);
      }
    } catch (error) {
      console.error('Error liking post:', error.message);
    }
  };

  return (
    <div className="container posts-container">
      <h5>Text with API</h5>
      {isError !== "" && <h2>{isError}</h2>}
      <div className="grid">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <h6>{post.title.toUpperCase()} {post.id}</h6>
            {post.blog_image && (
              <img src={post.blog_image.url} alt={post.title} className="card-image" />
            )}
            <button 
  onClick={() => handleLike(post.id, post.liked ? 'unlike' : 'like')} 
  style={{ backgroundColor: post.liked ? 'red' : 'inherit' }}
>
  <FontAwesomeIcon icon={faHeart} style={{ color: post.liked ? 'white' : 'inherit' }} />
  {' '}
  ({post.likes.length})
</button>
          </div>
        ))}
      </div>
    </div>
  );
}
