import mongoose from "mongoose";
import express from "express";
import {CategoriesController} from "./controllers/index.js";
import cors from "cors"
import * as dotenv from 'dotenv'
import {router as authRouter} from './routers/authRouter.js'
import cookieParser from 'cookie-parser'
import errorMiddleware from "./middlewares/errorMiddleware.js";
// import multer from 'multer'
// import {registerValidation} from "./validations.js";
// import handleValidationErrors from "./utils/handleValidationErrors.js";

dotenv.config()

// mongoose.set('useNewUrlParser', true)
// mongoose.set('useUnifiedTopology', true);

mongoose
    .connect(
        process.env.DB_URL, {}
    )
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()

// const storage = multer.diskStorage({
//     destination: (_, __, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (_, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({storage})

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(errorMiddleware)
app.get('/categories', CategoriesController.getCategories)

app.use('/auth', authRouter)

// app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
// app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
// app.get('/auth/me', checkAuth, UserController.getMe)
//
// app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
//     res.json({
//         url: `/uploads/${req.file.originalname}`
//     })
// })
//
// app.get('/posts', PostController.getAll)
// app.get('/posts/:id', PostController.getOne)
// app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update)
// app.delete('/posts/:id', checkAuth, PostController.remove)
// app.post('/posts', checkAuth, postCreateValidation, PostController.create)

const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
})