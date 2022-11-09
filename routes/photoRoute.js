import express from 'express';
import { getPhotos, getPhoto, createPhoto, deletePhoto } from '../controllers/PhotoController.js'


const router = express.Router()

router.route("/").get(getPhotos)
router.route("/:id").get(getPhoto)
router.route("/createphoto").post(createPhoto)
router.route("/:id").delete(deletePhoto)

export default router