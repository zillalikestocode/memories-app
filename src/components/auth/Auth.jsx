import {useState, useEffect} from 'react';
import { useDispatch} from 'react-redux'
import jwt_decode from 'jwt-decode'
import { TbLock } from 'react-icons/tb'
import Input from './Input'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import { signin, signup} from '../../actions/auth'

const Auth = () => {
	const dispatch = useDispatch()

	const initialState = {
		firstName: '', lastName: '', password:"", confirmPassword:"", email: "",
	}

	const [formData, setFormData] = useState(initialState)

	const [isSignUp, setIsSignUp] = useState(false);

	const navigate = useNavigate()

	const setSign = (e) => {
		e.preventDefault();
		setIsSignUp(prev => !prev)
	}

	const googleSuccess= async (res)=>{
		const token = res.credential
		const result = jwt_decode(token)
		try{
			dispatch({type: 'AUTH', data: { result, token }})
			navigate('/')
		}catch (err){
			console.log(error)
		}
	}

	useEffect(() => {
		google.accounts.id.initialize({
			client_id: "179329635064-pa4c5i82ohi653jdfsv8rgbac2g5kr03.apps.googleusercontent.com",
			callback: googleSuccess
		})
		google.accounts.id.renderButton(
			document.getElementById('signin'),
			{ theme: 'outline', size: 'large'}
		)
	}, [])

	const handleSubmit = (e)=>{
		e.preventDefault();
		console.log(formData)

		if(isSignUp){
			dispatch(signup(formData, navigate))
		}else{
			dispatch(signin(formData, navigate))
		}
	}

	const handleChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	return (
		<div className="w-fit flex flex-col items-center mx-auto p-4 bg-white text-center rounded-xl shadow-xl mt-16">
			<div className='flex flex-col items-center gap-3'>
				<div className="bg-blue-500 p-3 rounded-full text-white w-fit"><TbLock fontSize={30} /></div>
				<h4 className="text-xl font-medium">{isSignUp ? 'Sign Up' : 'Sign In'}</h4>
				<form className='flex flex-col items-center gap-3' onSubmit={handleSubmit}>
					{
						isSignUp && (
							<div className="flex w-64 gap-2">
								<Input onChange={handleChange} name="firstName" placeholder="First Name" type="text" autoFocus/>
								<Input onChange={handleChange} name="lastName" placeholder="Last Name" type="text" />
							</div>
						)
					}
					<Input onChange={handleChange} name="email" placeholder="Email" type="email" />
					<Input onChange={handleChange} name="password" placeholder="Password" type='password'/>
					{isSignUp && <Input onChange={handleChange} name="confirmPassword" placeholder="Confirm Password" type='password'/>}
					<div className="flex flex-col gap-2">
						<Button text={isSignUp ? 'Sign Up': 'Sign In'} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-blue-700 p-2 text-white font-medium rounded-md" type="submit"/>
						<div id="signin"></div>
						<Button text={isSignUp ? 'Already have an account? Sign In': "Don't have an account? Sign Up"} className="" onClick={setSign}/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Auth