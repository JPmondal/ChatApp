import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL

axios.defaults.baseURL = backendUrl

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{

    const [token,setToken] = useState(localStorage.getItem('token'))

    const [authUser,setAuthUser] = useState(null)

    const [onlineUsers,setOnlineUsers] = useState([])

    const [socket,setSocket] = useState(null)

    //checking user authentication for socket connection

    const checkAuth = async ()=>{
        try {
            const {data} = await axios.get('/api/user/check')

            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
            }
           
        } catch (error) {
            toast.error(error.message)
        }
    }

    //setting up socket connection

    const connectSocket = async (userData)=>{
       try {
         if(!userData || socket?.connected) return;

        const newSocket = io(backendUrl,{
            query : {
                userId : userData._id
            }
        })
        newSocket.connect()
        setSocket(newSocket)
        newSocket.on('getOnlineUsers', (userIds) => {
            setOnlineUsers(userIds)
        })
       } catch (error) {
        toast.error(error.message)
       }
    }


    //Login user
  const logIn = async(state,credentials) =>{
  try {
    const {data} = await axios.post(`/api/user/${state}`,credentials)
    console.log(data)

    if(data.success){
        setAuthUser(data.user)
        setToken(data.token)
        axios.defaults.headers.common['token'] = data.token
        localStorage.setItem('token',data.token)
        connectSocket(data.user)
        toast.success(data.message)
    }else{
        toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
  }

  //logout function 
  const logOut = async() =>{
    try {
        setOnlineUsers([])
        setAuthUser(null)
        setToken(null)
        axios.defaults.headers.common['token'] = null
        localStorage.removeItem('token')
        socket.disconnect()
        toast.success('Logged out successfully')
    } catch (error) {
        toast.error(error.message)
    }
  }

  // update profile function 
  const upDateProfile = async (body)=>{
    try {
        const {data} = await axios.put('/api/user/update-profle',body)

        if(data.success){
            setAuthUser(data.user)
            toast.success(data.message)

        }
    } catch (error) {
        toast.error(error.message)
        
    }
  }
  

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['token'] = token }
            checkAuth()
    },[])
   
    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        logIn,
        logOut,
        upDateProfile,
        connectSocket,
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}