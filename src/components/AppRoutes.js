import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import About from './About';
import Post from './Posts';
import TextForm from './TextForm';
import Login from './Login';
import Profile from './Profile';
import PostDetails from './PostDetails';
import ProfileForm from './ProfileForm';
import Followers from './users/Followers';
import ProfileCdreate from './users/ProfileCreate';
export default function AppRoutes() {
	return (
		<BrowserRouter>
      <Navbar title="TextUtils"/>
      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/posts" element={<Post/>} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/update_profile" element={<ProfileForm/>} />
        <Route exact path="/followers" element={<Followers/>} />
        <Route exact path="/profile_create" element={<ProfileCdreate/>} />
        <Route exact path="/" element={<TextForm heading="This is text box" />} />
      </Routes>
    </BrowserRouter>
	)
}