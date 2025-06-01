// import mongoose from "mongoose";

// const connectDB = async () =>{
//     try {

//          mongoose.connection.on('connected',()=>{
//             console.log("Connected to MongoDB Succesfully")
//         })

//         await mongoose.connect(`${process.env.MONGODB_URI}/chatapp`)

//     } catch (error) {
//         console.log(error)
//     }
// }

// export default connectDB

import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
