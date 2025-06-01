import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  //function to get all user for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/message/users");
 
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessage);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to get messages for sleected users
  const getMessages = async (slectedUserId) => {
    try {
      const { data } = await axios.get(`/api/message/${slectedUserId}`);
      if (data.success) {
        setMessages(data.messages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function for sned message to slected user

  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/message/send/${selectedUser._id}`,
        messageData
      );
      console.log(data)

      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        console.log("dsdsdsd",data.message)
        toast.error(data.message);
      }
    } catch (error) {
      console.log("dsdsdsd",error.message)
      toast.error(error.message);
    }
  };

  //function to suscribe to message for selectred user
const suscribeToMessage = async ()=>{
    if(!socket){
        return
    }

    socket.on('newMessage',(newMessage)=>{
        if(selectedUser && selectedUser._id === newMessage.senderId
        ){
            newMessage.seen = true
            setMessages((prevMessages)=>[...prevMessages,newMessage])
            axios.put(`/api/message/mark/${newMessage._id}`)
        }else{
            setUnseenMessages((prevUnseenMessages)=>({
                ...prevUnseenMessages,
                [newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
            }))
        }
    })
}
//function to unsuscribe from messages
const unsuscribeFromMessage = async ()=>{
   
   if(socket){
     socket.off('newMessage')
   }
}

useEffect(()=>{
    suscribeToMessage()
    return ()=> unsuscribeFromMessage()
},[socket,selectedUser])


  const value = {
    users,
    getUsers,
    selectedUser,
    setSelectedUser,
    messages,
    setMessages,
    sendMessage,
    unseenMessages,
    setUnseenMessages,
    getMessages
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
