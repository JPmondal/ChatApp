import express from "express";
import { protectRoute } from "../middlewares/auth.js";

import {userSignUp, userLogin, updateProfile
} from "../controllers/userController.js"


const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.get("/update-profile", protectRoute, updateProfile);


export default userRouter;