import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import "../Posts.css";

export default function PostDetails() {
  const { postId } = useParams(); // Access the postId parameter from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const user_data = localStorage.getItem('login_user');
        const user = JSON.parse(user_data);
        if (user === null) {
          navigate('/login');
          return;
        }
        const headers = {
          Authorization: `Bearer ${user.authentication_token}`,
        };
        const response = await axios.get(`${BASE_URL}/blog/${postId}`, {headers});
        setPost(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]); // Fetch data whenever postId changes

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <img 
            src={post.blog_image ? post.blog_image.url : require("../images/dog.jpg")} 
            alt={post.title}
          />
        </div>
      )}
    </div>
  );
}
