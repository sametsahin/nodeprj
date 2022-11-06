import User from "../models/User.js"
import jwt from 'jsonwebtoken'

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        //autheader consists of two elements like below
        //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY3MzNmN2MwMTg3YzJkZGVkNmUwNjUiLCJpYXQiOjE2Njc3MDk4MzQsImV4cCI6MTY2Nzc5NjIzNH0.ES7n9NDa1ZBnMK80vjqmAVE042qBu5T1b39a3zDROqE

        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                succeeded: false,
                error: 'No available token!'
            })
        } else {
            req.user = await User.findById(
                jwt.verify(token, process.env.JWT_SECRET).userId
            )
            next()
        }
    } catch (error) {
        res.status(401).json({
            succeeded: false,
            error: 'Not authorized!'
        })
    }


}

export { authenticateToken }