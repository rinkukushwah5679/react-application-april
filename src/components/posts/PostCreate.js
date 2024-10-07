// src/components/PostForm.js
import React, { useState } from 'react';
import './PostForm.css';
import { BASE_URL, getCurrentUser } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostCreate = () => {
	const navigate = useNavigate();
	const currentUser = getCurrentUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  console.log(currentUser)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', content);
    if (image) {
      formData.append('image', image);
    }
    console.log(currentUser)
    axios.post(`${BASE_URL}/blogs`, formData, {
      headers: {
        'Authorization': `Bearer ${currentUser.authentication_token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(data => {
      console.log('Post created successfully:', data);
      navigate('/posts');
      // Clear form or redirect, as needed
    })
    .catch(error => console.error('Error creating post:', error));
  };

  return (
  	<div className="post_form">
	    <form className="post-form" onSubmit={handleSubmit}>
	      <div className="form-group">
	        <label htmlFor="title">Title<span className="field_required">*</span></label>
	        <input
	          type="text"
	          id="title"
	          value={title}
	          onChange={(e) => setTitle(e.target.value)}
	          required
	        />
	      </div>
	      <div className="form-group">
	        <label htmlFor="content">Content<span className="field_required">*</span></label>
	        <textarea
	          id="content"
	          value={content}
	          onChange={(e) => setContent(e.target.value)}
	          required
	        ></textarea>
	      </div>
	      <div className="form-group">
	        <label htmlFor="image">Image<span className="field_required">*</span></label>
	        <input
	          type="file"
	          id="image"
	          accept="image/*"
	          onChange={(e) => setImage(e.target.files[0])}
	          required
	        />
	      </div>
	      <button type="submit" className="btn btn-primary">
	        Create Post
	      </button>
	    </form>
	  </div>
  );
};

export default PostCreate;
