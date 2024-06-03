import React, {useEffect, useState} from 'react'
import { BASE_URL } from '../../config';
import axios from 'axios';
import "../../Followers.css";

export default function Followers() {
	const [followers, setFollowers] = useState([]);	
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const FollersData = async () => {
		const user_data = localStorage.getItem('login_user');
		const user = JSON.parse(user_data);

		try {
			const headers = {
        Authorization: `Bearer ${user.authentication_token}`,
      };
			const res = await axios.get(`${BASE_URL}/follower_lists`, {headers})
			setFollowers(res.data);
		} catch (error) {
			setError(error.message);
		}
	};

	const handleFollow = async (userId, urlType) => {
  	const user_data = localStorage.getItem('login_user');
  	const user = JSON.parse(user_data);
  	try {
  		const headers = {
        Authorization: `Bearer ${user.authentication_token}`,
      };
      const response = await axios.get(`${BASE_URL}/${urlType}/${userId}`, {headers});
      setMessage(response.data.message)
      FollersData()
  	} catch (error) {
  		setError(error);
  	}
  };
	useEffect(() =>{
		FollersData();
	}, []);
	return (
		<>
		<h3 className="followers-screen">Followers Users</h3>
			{error && <div className="flash-message followers-screen">{error.message}</div>}
			{message && <div className="flash-message followers-screen">{message}</div>}
			<div className="grid-container">
	      {followers.map(follower => (
	        <div key={follower.id} className="grid-item">
	          <img src={follower.profile_image.url} alt={follower.name} className="follower-profile-image" />
	          <div className="profile-info">
	            <h3>{follower.name}</h3>
	            <p>@{follower.user_name}</p>
	            <button className="follow-button" onClick={() => handleFollow(follower.user_id, follower.follow ? 'unfollow_user' : 'follow_user')}>
	              {follower.follow ? 'Following' : 'Follow'}
	            </button>
	          </div>
	        </div>
	      ))}
	    </div>
	  </>
	)
}