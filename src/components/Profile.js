import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import "../Posts.css";
import "../Profile.css";
import UserData from "./users/ProfileData"

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

  // if (loading) {
  //   return (
  //     <div className="loading-container">
  //       <div className="loading">Loading...</div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="loading-container">
  //       <div className="error">Error: {error.message}</div>
  //     </div>
  //   );
  // }

  return <UserData profileData={profileData} loading={loading} error={error} is_current_user="true" />;
};

export default Profile;
