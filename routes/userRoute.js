import express from 'express';
import { createUser, loginUser, getDashboardPage } from '../controllers/UserController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/create").post(createUser)
router.route("/login").post(loginUser)
router.route("/dashboard").get(authenticateToken, getDashboardPage)

export default router