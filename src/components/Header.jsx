import {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import decode from 'jwt-decode'
import Button from './Button'
import { useDispatch } from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import { IoMenu } from 'react-icons/io5'

const Header = ({setSidebar, user, setUser}) => {
  const [width, setWidth] = useState(window.innerWidth)

  window.addEventListener('resize', () =>{
    setWidth(window.innerWidth)
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = ()=>{
    dispatch({type: 'LOGOUT'})
    setUser(null)
    navigate('/')
  }
  const location = useLocation()

  useEffect(() => {
    const token = user?.token

    if (token){
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <header>
      <nav className=" text-white shadow-lg rounded-xl bg-violet-300 p-2 px-5 flex items-center">
        <h4 className="text-3xl title">memories</h4>
        <div className="gap-3 flex items-center ml-auto">
        	{user ? (
        		<div className="flex items-center gap-5">
        			{ width > 650 && <h6>{user.result.name}</h6>}
            {
              user.result.picture ?
              <img src={user.result.picture} className="rounded-full w-10"></img>:
              <div className='w-9 h-9 flex items-center justify-center text-white rounded-full bg-blue-600'><span className="font-medium text-xl">{user.result.name[0]}</span></div>

            }
        			{width > 650 &&<Button text='Log Out' className="p-2 bg-white text-violet-500 font-base rounded-md" onClick={logout}/>}
        		</div>
        	):(
        		<Link to='/auth'><Button text="Sign in" className="p-2  font-medium border-2 border-white bg-clip-text  font-base rounded-md" /></Link>
        	)}
          {user && width < 650 &&<Button text={<IoMenu fontSize={25} onClick={()=> setSidebar(true)} />} />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
