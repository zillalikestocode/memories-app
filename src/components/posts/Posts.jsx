import React from 'react'
import Post from './post/Post'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import axios from 'axios'

const Posts = ( { currentId, setCurrentId, user }) => {
  const {posts, isLoading} = useSelector((state) => state.posts)

  return (
    <div className="md:grid md:grid-cols-auto flex flex-wrap  flex-col items-center mx-auto w-[90%] md:w-full gap-4  items-stretch">
        {
          isLoading ? <Loader /> : posts.map((post) => {
            return (
              <Post user={user} post={post} key={post._id} setCurrentId={setCurrentId} currentId={currentId}/>
            )
          })
        }
    </div>
  )
}

export default Posts