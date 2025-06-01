import React, { use, useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/ChatContext";

const SideBar = () => {
  const {
    users,
    getUsers,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);
  const { logOut, onlineUsers } = useContext(AuthContext);

  const navigate = useNavigate();

  const [input, setInput] = useState(false);
  const filteredUsers = input
    ? users.filter((user) => {
        return user.fullName.toLowerCase().includes(input.toLowerCase());
      })
    : users;

    useEffect(()=>{
      getUsers()
    },[onlineUsers])

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img className="max-w-40" src={assets.logo} alt="logo" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5  rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p
                onClick={(e) => {
                  logOut();
                }}
                className="cursor-pointer text-sm"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#282142] flex gap-2 px-4 py-3 rounded-full items-center mt-5">
          <img src={assets.search_icon} alt="search" className="w-3 h-4" />
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Search User..."
            className="flex-1 text-white bg-transparent outline-none border-none text-xs placeholder-[#c8c8c8]"
          />
        </div>
      </div>
      <div className="flex flex-col  gap-3">
        {filteredUsers.map((user, index) => (
          <div
            onClick={(e) => {
              setSelectedUser(user);
              setUnseenMessages({
                ...unseenMessages,
                [user._id]: 0,
              });
            }}
            key={index}
            className={`max-sm:text-sm p-2 rounded flex  gap-3 cursor-pointer relative ${
              selectedUser?._id === user._id && "bg-[#282142]"
            }`}
          >
            <img
              className="w-10 h-10 rounded-full"
              src={user?.profilePic || assets.avatar_icon}
              alt=""
            />
            <div className="flex flex-col">
              <p>{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-500 text-xs">Online</span>
              ) : (
                <span className="text-neutral-500 text-xs">Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className="text-white absolute right-3 top-3 bg-violet-500  text-xs rounded-full h-5 w-5 flex justify-center items-center">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
