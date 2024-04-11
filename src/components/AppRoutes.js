import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import About from './About';
import Post from './Posts';
import TextForm from './TextForm';
import Login from './Login';
import { useSelector } from 'react-redux'; 
export default function AppRoutes() {
  // const {user} = useSelector(state => state.user)
	return (
		<BrowserRouter>
      <Navbar title="TextUtils"/>
      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/posts" element={<Post/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/" element={<TextForm heading="This is text box" />} />
      </Routes>
    </BrowserRouter>
	)
}