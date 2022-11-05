import express from 'express';
import { createPhoto } from '../controllers/PhotoController.js'


const router = express.Router()

router.route("/createphoto").post(createPhoto)


export default router