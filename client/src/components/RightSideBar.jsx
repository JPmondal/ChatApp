import React, { useEffect, useState } from "react";
import assets, { imagesDummyData } from "../assets/assets";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSideBar = () => {
const {selectedUser, messages} = useContext(ChatContext)
const {logOut, onlineUsers} = useContext(AuthContext)
const [msgImg,setMsgImg] = useState([])


useEffect(()=>{
  setMsgImg(messages.filter(msg=>msg.image).map(msg=>msg.image))
},[messages])

  return (
    selectedUser && (
      <div className="h-full p-4 bg-[#8185B2]/10 relative">
        <div className="text-white flex flex-col gap-2 items-center mt-16">
          <img
            className="w-30 h-30 rounded-full"
            src={assets.profile_martin}
            alt=""
          />
          <h1 className="flex items-center gap-2 text-lg">
           {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
            {selectedUser.fullName}
          </h1>
          <p className="text-xs text-center">
           {selectedUser.bio}
          </p>
        </div>
        <hr className=" text-white mt-3" />
        <div className="">
          <p className="text-center text-white mt-2">Media</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {msgImg.map((url, index) => (
              <div key={index} className="cursor-pointer rounded">
                <img
                  onClick={() => window.open(url)}
                  className="h-full cursor-pointer rounded-md"
                  key={index}
                  src={url}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        <button onClick={()=>logOut()}
        className="text-white absolute bottom-2
         left-1/2 transform -translate-x-1/2 px-10 py-2 rounded-md bg-gradient-to-r from-purple-400 to-violet-600 border-none text-sm font-light cursor-pointer">Logout</button>
      </div>
    )
  );
};

export default RightSideBar;
