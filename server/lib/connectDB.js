import mongoose from "mongoose";

const connectDB = async () =>{
    try {

         mongoose.connection.on('connected',()=>{
            console.log("Connected to MongoDB Succesfully")
        })
        
        await mongoose.connect(`${process.env.MONGODB_URI}/chatapp`)
       

    } catch (error) {
        console.log(error)
    }
}

export default connectDB