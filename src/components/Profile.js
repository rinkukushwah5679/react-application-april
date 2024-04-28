import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import "../Posts.css";
import "../Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user_data = localStorage.getItem('login_user');
  const user = JSON.parse(user_data);

  useEffect(() => {
    const fetchData = async () => {
    	setLoading(true);
      try {
        if (user === null) {
          navigate('/login');
          return;
        }
        const headers = {
          Authorization: `Bearer ${user.authentication_token}`,
        };
        const response = await axios.get(`${BASE_URL}/view_profile`, {headers});
        setProfileData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile_name">{profileData.name.charAt(0).toUpperCase() + profileData.name.slice(1)}'s Profile ({user.id})</h2>
        <img src={profileData.profile_background_image.url} alt="Profile Background" />
      </div>
      <div className="profile-content">
        <div className="profile-image">
          <img src={profileData.profile_image.url} alt="Profile" />
        </div>
        <div className="profile-info">
          <p>About: {profileData.about}</p>
          <p>Instagram: <a href={profileData.instagram_url} target="_blank" rel="noopener noreferrer">{profileData.instagram_url}</a></p>
          <p>YouTube: <a href={profileData.youtub_url} target="_blank" rel="noopener noreferrer">{profileData.youtub_url}</a></p>
          <p>LinkedIn: <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer">{profileData.linkedin_url}</a></p>
          <p className="followers" onClick={() => navigate("/followers")}>Number of Followers: {profileData.number_followers}</p>
          <p>Number of Followings: {profileData.number_followings}</p>
          <p>Number of Posts: {profileData.number_posts}</p>
          <Link className="btn" to="/update_profile">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
