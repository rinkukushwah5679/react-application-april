import React, { useState } from 'react';
import "../../Posts.css";
function ProfileCreate() {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    dateOfBirth: '',
    gender: '',
    about: '',
    country: '',
    city: '',
    zipCode: '',
    address: '',
    instagramUrl: '',
    youtubeUrl: '',
    linkedinUrl: '',
    profileImage: null,
    profileBackgroundImage: null
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />

      <label htmlFor="userName">User Name:</label>
      <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleInputChange} />

      <label htmlFor="dateOfBirth">Date of Birth:</label>
      <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="about">About:</label>
      <textarea id="about" name="about" value={formData.about} onChange={handleInputChange} />

      {/* Add more input fields for other parameters */}
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProfileCreate;
