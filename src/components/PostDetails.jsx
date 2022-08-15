import {useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { TbChevronLeft } from 'react-icons/tb'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import CommentSection from './CommentSection'

const PostDetails = () => {
	const navigate = useNavigate()
	const { id } = useSearchParams()
	const {post} = useSelector(state => state.posts)
	const [width, setWidth] = useState(window.innerWidth)

	  window.addEventListener('resize', () =>{
	    setWidth(window.innerWidth)
	  })
	return (
		<div className="relative flex md:flex-row flex-col gap-3 items-center p-5 m-auto shadow-lg bg-white mt-12 md:w-fit rounded-3xl">
			{width < 650 && <div className="w-full -order-2"><Button text={<TbChevronLeft fontSize={25} color='white' />} className="rounded-full bg-violet-200 p-2 mb-5 shadow-md" onClick={() => navigate(-1)}/></div>}
			<div className="relative">
				{width > 650 && <Button text={<TbChevronLeft fontSize={25} color='white' />} className="rounded-full bg-violet-200 p-2 mb-5 shadow-md" onClick={() => navigate(-1)}/>}
				<h1 className='text-2xl font-semibold '>{post?.title}</h1>
				<p className="text-sm text-gray-500 mb-3">{post?.tags.map(tag => `#${tag} `)}</p>
				<h4 className="text-base font-medium ">Creator: {post?.name}</h4>
				<p className="mb-5 text-sm font-italics text-gray-700">{moment(post?.createdAt).fromNow()}</p>
				<div className="md:w-96">
					<p className='text-md font-md'>{post?.message}</p>
				</div>
				<CommentSection post={post} />
			</div>
			<div className="-order-1 md:order-1">
				<img src={post?.selectedFile} className="rounded-md md:w-96 " alt="" />
			</div>

		</div>
	)
}

export default PostDetails