import {useState} from 'react'
import Form from './form/Form'
import Posts from './posts/Posts'
import Pagination from './Pagination'
import { useLocation, useNavigate} from 'react-router-dom'
import {IoSearch} from 'react-icons/io5'
import Button from './Button'
import {FaTimes} from 'react-icons/fa'
import {HiHashtag} from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import {getPostsBySearch} from '../actions/posts'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}
const Home = ({ currentId, setCurrentId, user, setUser}) => {
  const dispatch = useDispatch()
  const query = useQuery()
  const navigate = useNavigate()
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery')
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const handleDelete = deltag => setTags(tags.filter(tag => tag !== deltag))
  const handleKeyPress = e =>{
    if (e.keyCode === 13){
      searchPosts()
    }
  }
  const handleTags = (e)=>{
    if (e.keyCode === 13){
      if(!tags.includes(e.target.value)) setTags([...tags, e.target.value])
      e.target.value = ''
    }
  }
  const searchPosts = ()=>{
    if(search.trim() || tags){
      dispatch(getPostsBySearch({search, tags: tags.join(',')}))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else{
      navigate('/')
    }
  }
  console.log()
	return (
		<div className=" my-5 w-full">
        <div className="flex justify-center gap-3 mx-auto w-full md:flex-row flex-col-reverse">
          <div className="grid">
            <Posts currentId={currentId} user={user} setUser={setUser} setCurrentId={setCurrentId}/>
          </div>
          <div className=" md:ml-auto md:w-fit p-0 flex flex-col items-center gap-3">
            <div className=" rounded-lg p-2 flex gap-3">
            <Button text={<IoSearch fontSize={25} style={{fill: 'white'}} />} 
                  className='rounded-full p-2 bg-violet-200 shadow-md' onClick={searchPosts}/>
              <input type="text" value={search} placeholder="Search Memories" className='focus:outline-none rounded-xl bg-violet-200 shadow-md md:w-56 p-2 w-[80%] px-3 text-white' name="search" onChange={(e)=> setSearch(e.target.value)} 
              onKeyUp={handleKeyPress}/> 
            </div>
            <div className='flex flex-col gap-2'>
              <div className="flex flex-wrap gap-1 text-violet-300 ml-14">
                {tags && tags.map(tag => (
                  <div key={Math.random() * 65038} className='bg-white shadow flex gap-1 p-1 px-2 text-sm rounded-full items-center'>
                    {tag}
                    <Button text={<FaTimes fontSize={15} /> } 
                    onClick={()=> setTags(tags.filter((deltag)=> deltag !== tag))}/>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                  <Button text={<HiHashtag fontSize={25} style={{fill: 'white'}} onClick={searchPosts}/>} 
                  className='rounded-full p-2 bg-violet-200 shadow-md' />
                <input type="text" placeholder="Search Tags" className='focus:outline-none md:w-56 rounded-xl w-[80%] bg-violet-200 shadow-md p-2 px-3 text-white' 
                onKeyUp={handleTags}/>
              </div>
              </div>
            <Form setUser={setUser} user={user} currentId={currentId} setCurrentId={setCurrentId}/>
            <div className="w-fit flex items-center my-3 justify-center">
              <Pagination page={page} />
            </div>
            
          </div>
        </div>
      </div>
	)
}

export default Home