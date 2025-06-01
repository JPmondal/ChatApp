import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { genToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// User sign up
const userSignUp = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  if (!fullName || !email || !password || !bio) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = genToken(newUser._id);

    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
//User Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All feilds are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const token = genToken(user._id);
    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      message: "user logged in succesfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).jsonj({
      success: false,
      message: error.message,
    });
  }
};

//controller to update user profile details
const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName, bio } = req.body;
    const userId = req.user._id;

    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId ,
        { fullName, bio },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);

      updatedUser = await User.findByIdAndUpdate(
         userId ,
        { fullName, bio, profilePic: upload.secure_url },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//check checkAuth
const checkAuth = async (req,res)=>{
  return res.status(200).json({
    success: true,
    message: "User is authenticated",
    user: req.user,
  })
}

export { userSignUp,checkAuth, userLogin, updateProfile };
