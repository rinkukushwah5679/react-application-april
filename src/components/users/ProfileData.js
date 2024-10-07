import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../Posts.css";
import "../../Profile.css";
import axios from 'axios'
import { BASE_URL } from '../../config';

const ProfileData = ({ profileData, loading, error, is_current_user }) => {
  const navigate = useNavigate();
  const [follow_error, setFollowError] = useState(null)
  const handleFollow = async (userId, urlType) => {
  	const user_data = localStorage.getItem('login_user');
  	const user = JSON.parse(user_data);
  	try {
  		const headers = {
        Authorization: `Bearer ${user.authentication_token}`,
      };
      const response = await axios.get(`${BASE_URL}/${urlType}/${userId}`, {headers});
  	} catch (error) {
  		setFollowError(error);
  	}

  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || follow_error) {
    return (
      <div className="loading-container">
        <div className="error">Error: {error.message}</div>
      </div>
    );
  }
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile_name">{profileData.name.charAt(0).toUpperCase() + profileData.name.slice(1)}'s Profile</h2>
        <img src={profileData.profile_background_image ? profileData.profile_background_image.url : require("../../images/default_bg.jpeg")} alt={profileData.profile_background_image ? profileData.name : "Profile Background"} />
      </div>
      <div className="profile-content">
        <div className="profile-image">
          <img src={profileData.profile_image ? profileData.profile_image.url : require("../../images/download.png")} alt="Profile" />
        </div>
        <div className="profile-info">
          <p>About: {profileData.about}</p>
          <p>Instagram: <a href={profileData.instagram_url} target="_blank" rel="noopener noreferrer">{profileData.instagram_url}</a></p>
          <p>YouTube: <a href={profileData.youtub_url} target="_blank" rel="noopener noreferrer">{profileData.youtub_url}</a></p>
          <p>LinkedIn: <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer">{profileData.linkedin_url}</a></p>
      		<p className="followers" onClick={() => navigate("/followers")}>Number of Followers: {profileData.number_followers}</p>
          <p className="followers" onClick={() => navigate("/followings")}>Number of Followings: {profileData.number_followings}</p>
          <p>Number of Posts: {profileData.number_posts}</p>
    			<Link className="btn" to="/update_profile">
      			Update Profile
  				</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
