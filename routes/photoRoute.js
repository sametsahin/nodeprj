import express from 'express';
import { getPhotos, createPhoto } from '../controllers/PhotoController.js'


const router = express.Router()

router.route("/").get(getPhotos)
router.route("/createphoto").post(createPhoto)


export default router