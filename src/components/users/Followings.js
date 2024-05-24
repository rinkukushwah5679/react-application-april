import React, {useEffect, useState} from 'react'
import { BASE_URL } from '../../config';
import axios from 'axios';
import "../../Followers.css";

export default function Followings() {
	const [followers, setFollowers] = useState([]);	
	const [error, setError] = useState(null);

	const FollersData = async () => {
		const user_data = localStorage.getItem('login_user');
		const user = JSON.parse(user_data);

		try {
			const headers = {
        Authorization: `Bearer ${user.authentication_token}`,
      };
			const res = await axios.get(`${BASE_URL}/following_lists`, {headers})
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
      FollersData()
  	} catch (error) {
  		setError(error.message);
  	}

  };
	useEffect(() =>{
		FollersData();
	}, []);
	return (
		<>
		<h3 className="followers-screen">Followings Users</h3>
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