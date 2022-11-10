import express from "express";
import { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getContactPage, sendEmail } from "../controllers/PageController.js"


const router = express.Router()

router.route("/").get(getIndexPage)
router.route("/about").get(getAboutPage)
router.route("/register").get(getRegisterPage)
router.route("/login").get(getLoginPage)
router.route("/contact").get(getContactPage)
router.route("/contact").post(sendEmail)


export default router