import Photo from "../models/Photo.js";

const getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({})
        res.status(200).render('photos', {
            photos,
            title: "photos"
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const getPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({ _id: req.params.id })
        res.status(200).render('photo', {
            photo,
            title: "photos"
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const createPhoto = async (req, res) => {
    try {
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id
        })
        res.status(201).redirect('/user/dashboard')
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}




export { getPhotos, getPhoto, createPhoto }