import express from 'express'
import dotenv from 'dotenv'
import conn from './db.js'
import cookieParser from 'cookie-parser'
import pageRoute from './routes/pageRoute.js'
import photoRoute from './routes/photoRoute.js'
import userRoute from './routes/userRoute.js'

dotenv.config()

//connection to the db
conn()

const app = express()
const port = process.env.PORT

//ejs template engine
app.set('view engine', 'ejs')

//static files
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//routes
app.use('/', pageRoute)
app.use('/photos', photoRoute)
app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`application running on port: ${port}`);
})


