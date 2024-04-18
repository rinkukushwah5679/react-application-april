import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import About from './About';
import Post from './Posts';
import TextForm from './TextForm';
import Login from './Login';
export default function AppRoutes() {
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