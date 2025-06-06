import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    bio : {
        type : String,
        default : "Hi Everyone, I am Using QuickChat"
    },
    profilePic : {
        type : String,
        default : ""
    }
},{timestamps :true})

const User = mongoose.model("User",UserSchema)

export default User