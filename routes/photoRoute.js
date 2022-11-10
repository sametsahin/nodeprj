import express from 'express';
import { getPhotos, getPhoto, createPhoto, deletePhoto, updatePhoto } from '../controllers/PhotoController.js'


const router = express.Router()

router.route("/").get(getPhotos)
router.route("/createphoto").post(createPhoto)
router.route("/:id").get(getPhoto)
router.route("/:id").delete(deletePhoto)
router.route("/:id").put(updatePhoto)
export default router