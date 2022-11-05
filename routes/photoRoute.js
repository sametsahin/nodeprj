import express from 'express';
import { getPhotos, getPhoto, createPhoto } from '../controllers/PhotoController.js'


const router = express.Router()

router.route("/").get(getPhotos)
router.route("/:id").get(getPhoto)
router.route("/createphoto").post(createPhoto)


export default router