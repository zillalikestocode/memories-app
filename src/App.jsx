import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from './components/Home'
import Auth from './components/auth/Auth'
import { useDispatch } from "react-redux";
import { getPosts } from './actions/posts'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { AnimatePresence } from 'framer-motion'
import PostDetails from './components/PostDetails'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}
function App() {
  const [sidebar, setSidebar] = useState(false)
  const query = useQuery()
  const page = query.get('page') || 1;
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  
  return (
    <div className=" p-5">
      <Header setSidebar={setSidebar} setUser={setUser} user={user} />
      <AnimatePresence>{sidebar && <Sidebar user={user} setSidebar={setSidebar} setUser={setUser} />}</AnimatePresence>
      <Routes>
        <Route path='/' element={<Navigate to="/posts" />} />
        <Route element={<Home page={page} currentId={currentId} setUser={setUser} user={user} setCurrentId={setCurrentId} />} path="/posts" exact />
        <Route element={<Home page={page} currentId={currentId} setUser={setUser} user={user} setCurrentId={setCurrentId} />} path="/posts/search" exact />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route element={!user ?<Auth /> : <Navigate to='/posts' />} path={"/auth"} exact />
      </Routes>
    </div>
  );
}

export default App;
