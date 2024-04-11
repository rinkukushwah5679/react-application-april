import axios from 'axios';
import React, {useState, useEffect} from 'react'
import "../Posts.css";
import {useSelector} from 'react-redux'
export default function Posts() {
	const [posts, setMyPosts] = useState([]);
	const [isError, setIsError] = useState("");
	const {user} = useSelector(state => state.user)
	// setIsError("sdcdcssds");
	// useEffect(() => {
	// 	axios.get("https://jsonplaceholder.typicode.com/posts")
	// 	  .then((res) => setMyPosts(res.data))
	// 	  .catch((error) => setIsError(error.message));
	//   }, []);

	const getApiData = async () =>{
		try {
			const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
			setMyPosts(res.data);
		} catch (error) {
			setIsError(error.message);
		}
		
	};

	useEffect(() =>{
		getApiData();
	})
	return (
		<div className="container posts-container"> {/* Add container for grid layout */}
			<h3>Text with API</h3>
			{isError !== "" && <h2>{isError}</h2>}
			<div className="grid">
				{
					user !== null &&
					<h3>{user.email}</h3>
				}
				{posts.slice(0, 9).map((post) => (
				<div key={post.id} className="card">
					<h4>{post.title.slice(0,15).toUpperCase()}</h4>
					<p>{post.body.slice(0, 100)}</p>
				</div>
				))}
			</div>
		</div>
	)
}