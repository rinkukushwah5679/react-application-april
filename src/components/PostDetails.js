import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import "../Posts.css";
import "../PostDetails.css";
import PostComments from './posts/Comments';
import { FaArrowLeft } from "react-icons/fa";
import Modal from './CommentModal';
export default function PostDetails() {
  const { postId } = useParams(); // Access the postId parameter from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <div className="blog-post">
      <span className="back-button" title="Back" onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ color: 'inherit', fontSize: '20px', marginRight: '5px' }} />
      </span>
      <h2 className="blog-title">{post.title}</h2>
      <p className="blog-date">Created at: {post.created_at}</p>
      <div className="blog-image">
        <img 
            src={post.blog_image ? post.blog_image.url : require("../images/dog.jpg")} 
            alt={post.title}
          />
      </div>
      <p className="blog-body">{post.body}</p>
      <div className="profile-section comment">
        <h3>Author: {post.profile.name}</h3>
        <p>{post.profile.about}</p>
        <img src={post.profile.image.url} alt="Profile" />
        <div className="social-links">
          <a href={post.profile.instagram_url} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={post.profile.youtub_url} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={post.profile.linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <PostComments postId={post.id} />
      <p className="new_comments" onClick={openModal}>
        Add comments
      </p>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} postId={post.id}>
        <h2>Comments</h2>
        
          <div key={post.id} className="comment">
            <p>Comments</p>
          </div>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <div className="likes-section">
        <h3>Likes</h3>
        {post.likes.map(like => (
          <img key={like.id} src={like.url} alt="Like" className="like-image" />
        ))}
      </div>
      <div className="like-status">
        {post.liked ? 'You liked this post' : 'You have not liked this post'}
      </div>
    </div>
  );
}
