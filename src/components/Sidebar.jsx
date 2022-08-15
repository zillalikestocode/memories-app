import React from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import {IoClose} from 'react-icons/io5'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Sidebar = ({ setUser, user, setSidebar}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const variants = {
		initial: {
			opacity: 1,
		},
		visible: {
			opacity: 1
		},
		exit: {
			opacity: 1
		}
	}
	const slide = {
		initial: {
			x: '100%',
		},
		visible: {
			x: 0,
			transition: {
				type: 'tween',
				duration: 0.2
			}
		},
		exit: {
			x: '100%'
		}
	}
	const sideLogout = ()=>{
	    dispatch({type: 'LOGOUT'})
	    setUser(null)
	    navigate('/')
	    setSidebar(false)
	  }
	return (
		<motion.div variants={variants} initial='initial' animate='visible' exit="exit" className="z-10 fixed bg-slate-700/50 top-0 right-0 h-screen w-screen">
			<motion.div variants={slide}  className="absolute w-[260px] right-0 h-full bg-violet-200 top-0 p-5">
				<div className="w-full flex"><Button onClick={()=> setSidebar(false)} className="ml-auto" text={<IoClose fontSize={28} />} /></div>
				<div className="flex flex-col gap-3 items-center mt-8">
					{
		              user?.result?.picture ?
		              <div className="m-auto"><img src={user?.result?.picture} className="rounded-full w-14"></img></div>:
		              <div className='w-14 h-14 m-auto flex items-center justify-center text-white rounded-full bg-blue-600'><span className="font-medium text-xl">{user?.result?.name[0]}</span></div>
					}
					<div><h4 className="text-xl font-medium">{user?.result?.name}</h4></div>
					<Button text='Log Out' className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md w-full mt-[100%]" onClick={sideLogout}/>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default Sidebar