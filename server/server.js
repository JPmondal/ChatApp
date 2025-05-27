import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

//creating server
const app = express();
const server = http.createServer(app);

//initializing socket.io
export const io = new Server(server, {
  cors: { origin: "*" },
});
//store online users
export const userSocketMap = {}; //{userId : socketId}

//socket.io connection handler function
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("New User Connected", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;

    //emit all online user
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on(disconnect, () => {
      console.log("User Disconnected", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  }
});

//middlewares
app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/status", (req, res) => {
  res.send("Server is Running");
});
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

//database connection
await connectDB();

const PORT = process.env.PORT || 5000;

//server listen
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
