import {Message} from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io,userSocketMap } from "../server.js";

// get alluser except logged in user

const getUserForSideBar = async (req, res) => {
  const userId = req.user._id;
  try {
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //find number of unread meaasages
    const unseenMessage = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessage[user._id] = messages.length;
      }
    });

    await Promise.all(promises);
    return res.status(200).json({
      success: true,
      users: filteredUsers,
      unseenMessage,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get allmessages for selected user

const getMessages = async (req, res) => {
  const { id: selectedUserId } = req.params;
  const myId = req.user._id;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: selectedUserId, receiverId: myId },
        {
          senderId: myId,
          receiverId: selectedUserId,
        },
      ],
    });

    //update as seen all message sent by that user
    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );
    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//mark message as seen using message _id

const markMesssageAsSeen = async (req,res) =>{
    const {id} = req.params;

    try {
        
        await Message.findByIdAndUpdate(id,{seen:true})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//send message to selected user
const sendMessage = async (req,res)=>{
  try {
    const receiverId = req.params.id;
    const {text,image}  = req.body;
    const senderId = req.user._id;

    let imageUrl

    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url
    }

   const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    image:imageUrl
   })

   const receiverSocketId = userSocketMap[receiverId];
   //emit message to receiver
   if(receiverSocketId){
    io.to(receiverSocketId).emit('newMessage',newMessage);
   }

   //no return
   res.status(201).json({
    success: true,
    newMessage,
   })

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { getUserForSideBar,getMessages,markMesssageAsSeen ,sendMessage};
