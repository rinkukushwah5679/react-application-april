import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "../Posts.css";
import { BASE_URL } from '../config';
import { useNavigate, Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";


export default function Posts() {
  const navigate = useNavigate();
  const [posts, setMyPosts] = useState([]);
  const [isError, setIsError] = useState("");
  const [current_user, SetCurrentUser] = useState(null);

  const getApiData = async () => {
    try {
      let user_data = localStorage.getItem('login_user');
      const user1 = JSON.parse(user_data);
      if (user1 === null) {
        navigate('/login');
        return; // Exit early if user is not logged in
      }

      SetCurrentUser(user1);

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

      const res = await axios.post(`${BASE_URL}/${urlType}/${postId}`, {}, { headers });
      if (res.status === 200) {
        // const updatedPosts = posts.map(post => {
        //   if (post.id === postId) {
        //     return { ...post, liked: !post.liked, likes_count: (urlType === 'unlike' ? (post.likes_count - 1) : (post.likes_count + 1)) }; // Update the post with the new like status and count
        //   }
        //   return post;
        // });
        // setMyPosts(updatedPosts);
        getApiData();
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
            <div className="post-header">
              {
                post.user_id === current_user.id ? (
                    <Link to='/profile'>
                      <img src={post.profile.image.url} alt={post.profile.name} className="post-profile-image" />
                      <span className="profile-name">{post.profile.name.charAt(0).toUpperCase() + post.profile.name.slice(1)}</span>
                    </Link>

                  ) : (
                    <Link to={`/profile/${post.profile.id}`}>
                      <img src={post.profile.image.url} alt={post.profile.name} className="post-profile-image" />
                      <span className="profile-name">{post.profile.name.charAt(0).toUpperCase() + post.profile.name.slice(1)}</span>
                    </Link>
                  )
              }
              
            </div>
            <Link to={`/posts/${post.id}`}>
              {post.blog_image ? (
                <img src={post.blog_image.url} alt={post.title} className="card-image" />
              ) : <img src={require("../images/dog.jpg")} alt="Default Image" className="card-image" />}
              <h6>{post.title.toUpperCase()} {post.id}</h6>
            </Link>
            <p onClick={() => handleLike(post.id, post.liked ? 'unlike' : 'like')}>
              {post.liked ? <FaHeart style={{ color: 'red', fontSize: '20px', marginRight: '5px' }} /> : <FaRegHeart style={{color: 'inherit', fontSize: '20px', marginRight: '5px'}}/>}({post.likes_count})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
