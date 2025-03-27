import express from "express"
import { getUserDetails, loginAdmin, loginUser, logoutUser, registerUser, updateUser } from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/user-details', authMiddleware, getUserDetails)
router.put('/update', authMiddleware, updateUser)

router.post("/login-admin", loginAdmin);


export default router