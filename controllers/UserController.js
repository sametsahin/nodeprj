import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            succeded: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
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

            if (same == true) {
                res.status(200).json({
                    user,
                    token: createToken(user._id)
                })
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


const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export { createUser, loginUser }