import React, {  useContext } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import {Toaster} from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'


const App = () => {

  const {authUser} = useContext(AuthContext)

  return (
    <div className="bg-cover bg-[url('/bgImage.svg')] bg-no-repeat">
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to={'/login'}/>}/>
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to={'/'}/>}/>
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to={'/login'}/>}/>
      </Routes>
      
    </div>
  )
}

export default App
