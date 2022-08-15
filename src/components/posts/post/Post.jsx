import {useState} from 'react'
import moment from 'moment'
import Button from '../../Button'
import {TbDots} from 'react-icons/tb'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import {MdOutlineDelete} from 'react-icons/md'
import { deletePost, likePost, getPost} from '../../../actions/posts.js'
import { useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'



const Post = ({post, setCurrentId, user}) => {
  const id = post._id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(post?.likes)
  const userId = user?.result?.sub || user?.result?._id
  const hasLikedPost = post.likes.find(like => like === userId)
  const handleLike = async() => {
    dispatch(likePost(post._id))

    if (hasLikedPost){
      setLikes(likes.filter((like) => like !== userId))
    }else{
      setLikes([...post.likes, userId])
    }
  }

  const Likes = ()=>{
    if(likes.length){
      return likes.find(like => like === (user?.result?.sub || user?.result?._id)) ?
      (
        <div className=" flex items-center text-sm"><FaHeart fontSize={20} style={{ fill: 'crimson'}}/>&nbsp;{likes.length > 2 ? `You and ${likes.length} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</div>
      ):(
        <div className={!user?.result ? 'text-gray-400 flex items-center text-sm' : 'text-sm flex items-center' }><FaRegHeart fontSize={20} style={!user?.result ? {fill: '#9ca3af'}:{ fill: 'crimson'}} />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</div>
      )
    }
    return <div className={!user?.result ? 'text-gray-400 flex items-center text-sm' : 'text-sm flex items-center' }><FaRegHeart fontSize={20} style={!user?.result ? {fill: '#9ca3af'}:{ fill: 'crimson'}} />&nbsp;Like</div>
  }
  

  const handleClick = (e)=>{
    dispatch(getPost(id, navigate))
  }
  return (
    <div className="shadow-lg h-fit rounded-xl  bg-white relative mx-auto">
      <div className='cursor-pointer' onClick={handleClick}>
      <div className='relative'>
        <div className="bg-slate-800/25 w-full h-full rounded-t-xl absolute top-0 bottom-0 right-0 "/>
        <div className="absolute p-3 text-white flex items-start  w-full">
          <div>
            <h4 className="text-lg font-medium">{post.name}</h4>
            <h4 className="text-sm">{moment(post.createdAt).fromNow()}</h4>
          </div>
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) &&
            <Button className="ml-auto edit" onClick={()=> setCurrentId(post._id)} text={<TbDots fontSize={25} />} />}
        </div>
        <img src={post.selectedFile} className="rounded-t-xl " alt="" />
      </div>
      <div className='p-3'>
        <h4 className='text-xl font-semibold mb-2'>{post.title}</h4>
        <p className='text-sm'>{post.message}</p>
        <p className="text-sm text-gray-500 mt-3">{post.tags.map((tag) => `#${tag} `)}</p>
      </div>
      </div>
      <div className="p-3 flex">
        <Button disabled={!user?.result} onClick={handleLike} text={(<div className="flex items-center gap-1"><Likes /></div>)}/>
        { (user?.result?.sub === post?.creator || user?.result?._id === post?.creator)  &&
          <Button onClick={()=> dispatch(deletePost(post._id))} className="ml-auto text-red-500" text={<MdOutlineDelete fontSize={25} />} />}
      </div>
    </div>
  )
}

export default Post