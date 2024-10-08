import React, { useState } from 'react';
import "../../Posts.css";
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
function ProfileCreate() {
	const navigate = useNavigate();
	const user_data = localStorage.getItem('login_user');
  const user = JSON.parse(user_data);
  const [formData, setFormData] = useState({
    name: '',
    user_name: '',
    date_birth: '',
    gender: '',
    about: '',
    country: '',
    city: '',
    zip_code: '',
    address: '',
    instagram_url: '',
    youtub_url: '',
    linkedin_url: '',
    profile_image: null, // Updated to store file data
    profile_background_image: null, // Updated to store file data
  });
  const [flashMessage, setFlashMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileInputChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleSubmit = async (event) => {
		  event.preventDefault();
		  try {
		    const headers = {
		      Authorization: `Bearer ${user.authentication_token}`,
		    };
		    // Create form data object to send to the server
		    const formDataToSend = new FormData();
		    Object.keys(formData).forEach((key) => {
		      // Check if the key corresponds to a file input and if it has a value
		      if (key === 'profile_background_image' || key === 'profile_image') {
		        if (formData[key]) {
		          formDataToSend.append(key, formData[key]);
		        }
		      } else {
		        formDataToSend.append(key, formData[key]);
		      }
		    });
		    // Send updated profile data to the server
		    const response = await axios.post(`${BASE_URL}/profile`, formDataToSend, { headers });
		    if (response.data.errors != null) {
		      setFlashMessage(response.data.errors);
		    } else {
		      localStorage.setItem('login_user', JSON.stringify(response.data.data));
		      // if (response.data.data.profile_created) {
		      //   navigate('/posts');
		      //   setFlashMessage('Profile created successfully');
		      //   return;
		      // }
		      setFlashMessage('Profile created successfully');
		    }
		    // console.log('Profile updated successfully:', response.data);
		  } catch (error) {
		  	setFlashMessage(error.response.data.errors);
		  	// alert(error.response.data.errors);
		    // console.log('Error creating profile:', error.response.data.errors);
	  }
	};


  return (
  	<div className="profile-container">
	  	{flashMessage && <div className="flash-message">{flashMessage}</div>}
	    <form onSubmit={handleSubmit} className="profile-form">
	    	<label>Background image<span className="field_required">*</span></label>
        <input type="file" name="profile_background_image" onChange={handleFileInputChange} required />

        <label>Profile image<span className="field_required">*</span></label>
        <input type="file" name="profile_image" onChange={handleFileInputChange} required />

	      <label htmlFor="name">Name<span className="field_required">*</span></label>
	      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

	      <label htmlFor="user_name">User Name<span className="field_required">*</span></label>
	      <input type="text" id="user_name" name="user_name" value={formData.user_name} onChange={handleInputChange} required />

	      <label htmlFor="date_birth">Date of Birth<span className="field_required">*</span></label>
	      <input type="date" id="date_birth" name="date_birth" value={formData.date_birth} onChange={handleInputChange} required />

	      <label htmlFor="about">About<span className="field_required">*</span></label>
	      <textarea id="about" name="about" value={formData.about} onChange={handleInputChange} required />

	      <label>Instagram URL<span className="field_required">*</span></label>
        <input type="text" name="instagram_url" value={formData.instagram_url} onChange={handleInputChange} required />

        <label>YouTube URL<span className="field_required">*</span></label>
        <input type="text" name="youtub_url" value={formData.youtub_url} onChange={handleInputChange} required />

        <label>LinkedIn URL<span className="field_required">*</span></label>
        <input type="text" name="linkedin_url" value={formData.linkedin_url} onChange={handleInputChange} required />

	      <label htmlFor="country">Country<span className="field_required">*</span></label>
	      <input id="country" name="country" value={formData.country} onChange={handleInputChange} required />

	      <label htmlFor="city">City<span className="field_required">*</span></label>
	      <input id="city" name="city" value={formData.city} onChange={handleInputChange} required />

	      <label htmlFor="zip_code">Zip code<span className="field_required">*</span></label>
	      <input id="zip_code" name="zip_code" value={formData.zip_code} onChange={handleInputChange} required />

	      
	      <button type="submit">Submit</button>
	    </form>
	  </div>
  );
}

export default ProfileCreate;
