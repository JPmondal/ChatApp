import express from "express";
import { protectRoute } from "../middlewares/auth.js";
import { getUserForSideBar,getMessages,markMesssageAsSeen, sendMessage } from "../controllers/messageController.js";


const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getUserForSideBar)
messageRouter.get("/:id",protectRoute,getMessages)
messageRouter.put("/mark/:id",protectRoute,markMesssageAsSeen)
messageRouter.post('/send/:id',protectRoute,sendMessage)


export default messageRouter;