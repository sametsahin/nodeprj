import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Photo from "../models/Photo.js";

const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id })
    const user = await User.findById({ _id: res.locals.user._id }).populate(["followings", "followers"])


    
    res.render('dashboard', { title: 'dashboard', photos, user });
}

const getUsersPage = async (req, res) => {
    const users = await User.find({ _id: { $ne: res.locals.user._id } })
    res.render('users', { title: 'users', users });
}

const getUserPage = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        const photos = await Photo.find({ user: req.params.id })
        const checkFollower = user.followers.some((follower) => {
            return follower.equals(res.locals.user._id)
        })
        res.status(200).render('user', { user, photos, checkFollower, title: "user" })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const follow = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            { _id: req.params.id }, //the user who I want follow
            { $push: { followers: res.locals.user._id } },
            { new: true } //after done process, return new one
        )
        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },//the user who I am
            { $push: { followings: req.params.id } },
            { new: true }
        )
        res.status(200).redirect(`/users/${req.params.id}`)
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const unfollow = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            { _id: req.params.id }, //the user who I want follow
            { $pull: { followers: res.locals.user._id } },
            { new: true } //after done process, return new one
        )
        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },//the user who I am
            { $pull: { followings: req.params.id } },
            { new: true }
        )
        res.status(200).redirect(`/users/${req.params.id}`)
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({ user: user._id })
    } catch (error) {
        console.log('error: ', error);
        let errorArr = {}

        if (error.code == 11000) {
            errorArr.email = 'The email is already registered!'
        }

        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errorArr[key] = error.errors[key].message
            })
        }
        console.log("errors: ", errorArr);

        res.status(400).json(errorArr)
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body

        //due to username is unique, we used findone
        const user = await User.findOne({ username: username })
        let same = false

        if (user) {
            same = await bcrypt.compare(password, user.password)

            if (same) {

                const token = createToken(user._id)
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                })

                res.redirect('/users/dashboard')
            } else {
                res.status(401).json({
                    succeded: false,
                    error: "Passwords are not matched"
                })
            }
        } else {
            res.status(401).json({
                succeded: false,
                error: "There is no such a user"
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error: 'try is blown'
        })
    }
}

const logoutUser = (req, res) => {
    res.cookie('jwt', ' ', {
        maxAge: 1
    })
    res.redirect('/')
}

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export { getDashboardPage, getUsersPage, getUserPage, createUser, loginUser, logoutUser, follow, unfollow }