import React, { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMsgTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
const {messages, selectedUser, setSelectedUser, senMessage, getMessages}  = useContext(ChatContext)

const {authUser, onlineUsers}  = useContext(AuthContext)
  const scrollEndRef = useRef()
// handle send mesage
  const handleSendMessage = async(e)=>{
   e.preventDefault();
   if(input.trim() === '') return
   await senMessage({text : input.trim()})
   setInput('')
  }
  //handle image sending
  const handleSendImage = async (e)=>{
    const file = e.target.files[0];
    if(!file || !file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
     await senMessage({
        image : reader.result
      })
    };

    reader.readAsDataURL(file);
    //empty the image input feild
    e.target.value = '';
    
  }

const [input,setInput] = useState('')

  useEffect(()=>{
   if(scrollEndRef.current && messages){
    scrollEndRef.current.scrollIntoView({behavior:'smooth'})
   }
  },[messages])

  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser._id)
    }
  },[selectedUser])

  return selectedUser ? (
    <div className="h-full p-3 overflow-scroll backdrop-blur-lg relative">
      {/* Headers  */}
      <div className="flex items-center justify-between border-b border-stone-500 p-2">
        <div className="flex gap-2 items-center justify-center">
          <img
            className="w-10 h-10 rounded-full"
            src={selectedUser.profilePic || assets.avatar_icon}
            alt=""
          />
          <p className="text-white flex items-center gap-2">
            {selectedUser.fullName}
           {
            onlineUsers.includes(selectedUser._id) && (
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            )
           }
          </p>
        </div>
        <img
          onClick={() => setSelectedUser(null)}
          className="w-5 md:hidden"
          src={assets.arrow_icon}
          alt=""
        />
        <img className="w-5 max-md:hidden" src={assets.help_icon} alt="" />
      </div>
      {/* Chat Area   */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll gap-3 py-3 text-white">
        {messages.map((msg,index)=>(
          <div key={index} className={`flex items-end justify-end gap-2 ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
            {
              msg.image ? (
                <img className="max-w-[220px] overflow-hidden mb-8" src={msg.image}  alt="" />
              ):(
                <p className={`bg-violet-500/30 max-w-[200px] p-2 mb-8 rounded  break-all ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
              )
            }
            <div>
              <img className="w-10 rounded-full" src={msg.senderId === authUser._id ? authUser.profilePic || assets.avatar_icon : selectedUser.profilePic || assets.avatar_icon} alt="" />
              <p className="text-xs">{formatMsgTime(msg.createdAt)}</p>
            </div>

          </div>
        ))}
        <div ref={scrollEndRef}></div>
      </div>
      {/* bottom area  */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3">
          <div className="flex-1 flex bg-gray-100/30 rounded-full p-2 px-3">
            <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={(e)=> e.key === 'Enter' ? handleSendMessage(e) : null } className=" flex-1 border-none outline-none placeholder-gray-400 text-white  text-sm font-light" type="text" placeholder="Send a message" />
            <input onChange={handleSendImage} type="file" id="image" hidden accept="image/png, image/jpeg"/>
            <label className="cursor-pointer" htmlFor="image">
              <img src={assets.gallery_icon} alt="" />
            </label>
          </div>
          <img onClick={handleSendMessage} className="cursor-pointer" src={assets.send_button} alt="" />
      </div>
    </div>
  ) : (
    <div className="h-full flex flex-col items-center justify-center text-white text-2xl max-md:hidden bg-white/10">
      <img className="w-20" src={assets.logo_icon} alt="" />
      <p>Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
