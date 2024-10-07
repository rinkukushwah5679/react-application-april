import React, {useState } from 'react'
import {signupUser, signinUser} from '../redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Login() {
	const navigate = useNavigate();
	// const HandleonChange = (event)=>{
  //     // console.log("Handel on change")
  //     setText(event.target.value)
  //   };
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const [auth, setAuth] = useState("Signin")
	const {loading, message} = useSelector(state => state.user)

	let user_data = localStorage.getItem('login_user');
  const user1 = JSON.parse(user_data);
	const authenticate = () =>{
		if (auth === "Signin"){
			dispatch(signinUser({user: { email, password }}))
		}else{
			dispatch(signupUser({user: { email, password }}))
		}

	}

	return (
		<>
		{
			user1 !== null &&
			(user1.profile_created ? (
				<h1>{navigate("/posts")}</h1>
			) : (
				<h1>{navigate("/profile_create")}</h1>
			))
		}
		
		<div className="container my-5">

			{
				loading &&
				 <div className="progress">
		      <div className="indeterminate"></div>
			  </div>
			}

			<h1>Please {auth}!</h1>
			
			{
				message &&
				<h5>{message}</h5>
			}
			<div className="mb-3 row">
				<label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
				<div className="col-sm-10">
					<input type="text" className="form-control" id="staticEmail" value={email} onChange={(text) => setEmail(text.target.value)}/>
				</div>
			</div>
			<div className="mb-3 row">
				<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
				<div className="col-sm-10">
					<input type="password" className="form-control" id="inputPassword"  value={password} onChange={(text) => setPassword(text.target.value)}/>
				</div>
			</div>
			{
				auth === 'Signin' ?
					<h6 onClick={() => setAuth('SignUp')}>Don't have a account ?</h6>:
					<h6 onClick={() => setAuth('Signin')}>Already have an account ?</h6>
				
			}
			<div className="mb-3 row">
				<label htmlFor="inputPassword" className="col-sm-2 col-form-label"></label>
				<div className="col-sm-10">
					<button type='submit' onClick={() => authenticate()} className='btn btn-primary'>{auth}</button>
				</div>
			</div>
			
		</div>
		</>
	)
}