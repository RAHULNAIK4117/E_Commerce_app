import express from "express";
import { loginUser, registerUser, adminlogin } from "../controllers/usercontroller.js";

const userRouter = express.Router();

// Correct API Endpoints
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin",adminlogin);

export default userRouter;
