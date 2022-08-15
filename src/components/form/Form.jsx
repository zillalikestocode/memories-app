import React, {useState, useEffect} from 'react';
import FileBase from 'react-file-base64';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId, user}) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: ''
  })

  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.posts.find((post)=> post._id === currentId) : null)
  const clear = ()=> {
    setCurrentId(null)
    setPostData({ title: '', message: '', tags: '', selectedFile: ''})
  }
  const handleSubmit = (e)=> {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
    }else {
      dispatch(createPost({...postData, name: user?.result?.name}))
    }
    clear()
  }

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  if (!user?.result?.name){
    return (
      <div className='rounded-xl shadow-lg text-center mx-auto p-5 h-fit bg-white w-[90%]'>
        <h4>Please Sign in to start creating memories and liking others memories.</h4>
      </div>
     )
  }

  return (
    <div className='rounded-xl shadow-lg text-center mx-auto p-5 h-fit bg-white md:w-[80%] w-[80%]'>
      <form action="" noValidate autoComplete='off' onSubmit={handleSubmit}>
        <h4 className='mb-2 text-xl font-semibold '>{currentId ? "Update" : 'Create'} a memory</h4>
        <div className='flex flex-col gap-2 w-[95%] mx-auto'>
          <input name='title' label='title' value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} type="text" className='p-2 rounded-md focus:outline-none bg-violet-100 shadow' placeholder='Title' required/>
          <textarea name='message' label='message' value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} type="text" className='h-32 p-2 rounded-md focus:outline-none bg-violet-100 shadow' placeholder='Message' required/>
          <input name="tags" label='tags' value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} type="text" className='p-2 rounded-md focus:outline-none bg-violet-100 shadow' placeholder='Tags(seperated with commas)' />
          <div className="overflow-hidden">
            <FileBase type="file" multiple={false} onDone={({base64})=> setPostData({...postData, selectedFile: base64})}/>
          </div>
          <Button text={`${currentId ? "Update": "Create"} memory`} type='submit' className='bg-blue-600 p-2 text-white rounded-md font-medium hover:bg-blue-700' />
          <Button text="Clear" onClick={() => clear} className='bg-red-500 p-2 text-white rounded-md font-medium hover:bg-red-600' />
          
        </div>
      </form>
    </div>
  )
}

export default Form