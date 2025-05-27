import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMsgTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {

  const scrollEndRef = useRef()

  useEffect(()=>{
   if(scrollEndRef.current){
    scrollEndRef.current.scrollIntoView({behavior:'smooth'})
   }
  },[])

  return selectedUser ? (
    <div className="h-full p-3 overflow-scroll backdrop-blur-lg relative">
      {/* Headers  */}
      <div className="flex items-center justify-between border-b border-stone-500 p-2">
        <div className="flex gap-2 items-center justify-center">
          <img
            className="w-10 h-10 rounded-full"
            src={assets.profile_martin}
            alt=""
          />
          <p className="text-white flex items-center gap-2">
            Martin Johonson{" "}
            <span className="w-2 h-2 rounded-full bg-green-700"></span>
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
        {messagesDummyData.map((msg,index)=>(
          <div key={index} className={`flex items-end justify-end gap-2 ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
            {
              msg.image ? (
                <img className="max-w-[220px] overflow-hidden mb-8" src={msg.image}  alt="" />
              ):(
                <p className={`bg-violet-500/30 max-w-[200px] p-2 mb-8 rounded  break-all ${msg.senderId === "680f50e4f10f3cd28382ecf9" ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
              )
            }
            <div>
              <img className="w-10 rounded-full" src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" />
              <p className="text-xs">{formatMsgTime(msg.createdAt)}</p>
            </div>

          </div>
        ))}
        <div ref={scrollEndRef}></div>
      </div>
      {/* bottom area  */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3">
          <div className="flex-1 flex bg-gray-100/30 rounded-full p-2 px-3">
            <input className=" flex-1 border-none outline-none placeholder-gray-400 text-white  text-sm font-light" type="text" placeholder="Send a message" />
            <input type="file" id="image" hidden accept="image/png, image/jpeg"/>
            <label className="cursor-pointer" htmlFor="image">
              <img src={assets.gallery_icon} alt="" />
            </label>
          </div>
          <img className="cursor-pointer" src={assets.send_button} alt="" />
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
