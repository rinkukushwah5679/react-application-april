import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Profile.css";
import { BASE_URL } from '../config';

const ProfileUpdateForm = () => {
  const user_data = localStorage.getItem('login_user');
  const user = JSON.parse(user_data);
  const [formData, setFormData] = useState({
    name: '',
    user_name: '',
    about: '',
    date_birth: null,
    instagram_url: '',
    youtub_url: '',
    linkedin_url: '',
    profile_image: null, // Updated to store file data
    profile_background_image: null, // Updated to store file data
  });
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    // Fetch profile data and populate form fields
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user.authentication_token}`,
      };
      const response = await axios.get(`${BASE_URL}/view_profile`, { headers });
      const profileData = response.data.data;
      debugger
      setFormData({
        name: profileData.name,
        user_name: profileData.user_name,
        about: profileData.about,
        date_birth: profileData.date_birth,
        instagram_url: profileData.instagram_url,
        youtub_url: profileData.youtub_url,
        linkedin_url: profileData.linkedin_url,
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'profile_image' || e.target.name === 'profile_background_image') {
      // Set file data for image inputs
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      // Update other form fields
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${user.authentication_token}`,
      };
      // Create form data object to send to the server
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      // Send updated profile data to the server
      const response = await axios.put(`${BASE_URL}/update_profile`, formDataToSend, { headers });
      if (response.data.errors != null) {
        console.error(response.data.errors);
        setFlashMessage(response.data.errors);
      } else {
        fetchProfileData();
        setFlashMessage('Profile updated successfully');
      }
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  console.log("***************", formData)
  return (
    <div className="profile-container">
      <h2>Update Profile</h2>
      {flashMessage && <div className="flash-message">{flashMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>Background image:</label>
        <input type="file" name="profile_background_image" onChange={handleChange} />

        <label>Profile image:</label>
        <input type="file" name="profile_image" onChange={handleChange} />

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Username:</label>
        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} />

        <label>About:</label>
        <textarea name="about" value={formData.about} onChange={handleChange} />

        <label>Date of Birth:</label>
        <input type="date" id="date_birth" name="date_birth" value={formData.date_birth} onChange={handleChange} />

        <label>Instagram URL:</label>
        <input type="text" name="instagram_url" value={formData.instagram_url} onChange={handleChange} />

        <label>YouTube URL:</label>
        <input type="text" name="youtub_url" value={formData.youtub_url} onChange={handleChange} />

        <label>LinkedIn URL:</label>
        <input type="text" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
