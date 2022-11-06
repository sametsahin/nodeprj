import express from 'express';
import { getDashboardPage,createUser, loginUser,logoutUser  } from '../controllers/UserController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/create").post(createUser)
router.route("/login").post(loginUser)
router.route("/dashboard").get(authenticateToken, getDashboardPage)
router.route("/logout").get(logoutUser)

export default router