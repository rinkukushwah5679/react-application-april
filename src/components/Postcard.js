import React, {useState} from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function PostCard({ post, posts }) {
  const navigate = useNavigate();
  const [postss, setMyPosts] = useState([]);

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

      const res = await axios.post(`${BASE_URL}/${urlType}/${postId}`, {}, { headers });
      if (res.status === 200) {
        const updatedPosts = posts.map(post => {
          if (post.id === postId) {
            return { ...post, liked: !post.liked, likes_count: (urlType === 'unlike' ? (post.likes_count - 1) : (post.likes_count + 1)) }; // Update the post with the new like status and count
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
    <div key={post.id} className="card">
      <h6>{post.title.toUpperCase()} {post.id}</h6>
      {post.blog_image && (
        <img src={post.blog_image.url} alt={post.title} className="card-image" />
      )}
      <button 
        onClick={() => handleLike(post.id, post.liked ? 'unlike' : 'like')} 
        style={{ backgroundColor: post.liked ? 'white' : 'inherit' }}>
        {post.liked ? <FaHeart style={{ color: 'red', fontSize: '20px', marginRight: '5px' }} /> : <FaRegHeart style={{color: 'inherit', fontSize: '20px', marginRight: '5px'}}/>} ({post.likes_count})
      </button>
    </div>
  );
}
