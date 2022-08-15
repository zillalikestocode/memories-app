import React, {useState, useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux'
import Button from './Button'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { commentPost} from '../actions/posts'

const CommentSection = ({post}) => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const commentsRef = useRef();
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const postComment = async()=>{
        const newComment = await dispatch(commentPost({name: user.result.name, comment: comment}, post._id))
        setComments(newComment)
        setComment('')

        commentsRef.current.scrollIntoView({ behaviour: 'smooth'})
    }
  return (
    <div className="mt-5">
        <h4 className="font-semibold text-md">Comments</h4>
        <div className="flex flex-col md:flex-row mt-2 gap-2">
            <div className="flex flex-col gap-2 md:h-24 md:overflow-y-scroll comment-section">
            {comments &&
                comments.map(({name, comment}, i)=> (
                    <div key={i}>
                        <h4 className='text-xs font-medium'>{name}</h4>
                        <div  className="rounded-3xl rounded-bl max-w-[250px] bg-violet-300 shadow-md text-white p-2 px-3 w-fit"><h4 className='text-sm font-medium'>{comment}</h4></div>
                    </div>
                ))
            }
            <div ref={commentsRef}/>
            </div>
            {user?.result?.name ? <div className="md:ml-auto flex flex-col gap-2 items-center md:items-start">
                <textarea type="text" value={comment} onChange={(e)=> setComment(e.target.value)} placeholder='Write a comment' className='bg-violet-100 p-2 focus:outline-none rounded-md shadow-md'/>
                <Button disabled={!comment} onClick={postComment} text={(
                    <div className={`flex gap-2 items-center p-2 px-3 ${!comment ? 'bg-gray-200': 'bg-violet-300'} rounded-full shadow-md w-fit`}>
                        <BiMessageSquareDetail fontSize={20} color="white"/>
                        <h4 className="text-white font-medium">Comment</h4>
                    </div>
                )} />
            </div> : <div className="w-fit font-medium">Please Sign In to comment</div>}
        </div>
        
    </div>
  )
}

export default CommentSection