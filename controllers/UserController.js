import User from "../models/User.js";
import bcrypt from 'bcrypt'

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
                res.status(200).send('You are logged in')
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


export { createUser, loginUser }