import Photo from "../models/Photo.js";
import { v2 as cloudinary } from 'cloudinary'
import fs from "fs";

const getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({})
        res.status(200).render('photos', { photos, title: "photos" })
    } catch (error) {
        res.status(500).json({ succeded: false, error })
    }
}

const getPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({ _id: req.params.id }).populate('user')
        res.status(200).render('photo', { photo, exist_user: res.locals.user._id, title: "photos" })
    } catch (error) {
        res.status(500).json({ succeded: false, error })
    }
}


const deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        const photoId = photo.image_id;

        await cloudinary.uploader.destroy(photoId);
        await Photo.findOneAndRemove({ _id: req.params.id });

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(500).json({ succeded: false, error });
    }
};

const updatePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (req.files) {
            const photoId = photo.image_id
            await cloudinary.uploader.destroy(photoId)
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    use_filename: true,
                    folder: process.env.CLOUD_FOLDER_NAME
                }
            )
            photo.url = result.secure_url
            photo.image_id = result.public_id

            fs.unlinkSync(req.files.image.tempFilePath)
        }
        photo.name = req.body.name
        photo.description = req.body.description
        photo.save()


        res.status(200).redirect(`/photos/${req.params.id}`);
    } catch (error) {
        res.status(500).json({ succeded: false, error });
    }
};

const createPhoto = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: process.env.CLOUD_FOLDER_NAME
        }
    )
    try {
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url,
            image_id: result.public_id
        })
        fs.unlinkSync(req.files.image.tempFilePath)
        res.status(201).redirect('/users/dashboard')
    } catch (error) {
        res.status(500).json({ succeded: false, error })
    }
}




export { getPhotos, getPhoto, createPhoto, deletePhoto, updatePhoto }