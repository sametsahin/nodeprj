import express from 'express';
import { getDashboardPage, getUsersPage, getUserPage, createUser, loginUser, logoutUser, follow, unfollow } from '../controllers/UserController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route("/dashboard").get(authenticateToken, getDashboardPage)
router.route("/logout").get(logoutUser)
router.route("/").get(authenticateToken, getUsersPage)
router.route("/:id").get(authenticateToken, getUserPage)
router.route("/create").post(createUser)
router.route("/login").post(loginUser)
router.route("/:id/follow").put(authenticateToken, follow)
router.route("/:id/unfollow").put(authenticateToken, unfollow)

export default router