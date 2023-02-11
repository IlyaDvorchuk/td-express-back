import mongoose from "mongoose";
import express from "express";
import {CategoriesController} from "./controllers/index.js";
import cors from "cors"
import multer from 'multer'

mongoose
    .connect(
        'mongodb+srv://admin:wwwwww@td-market.zlmpc.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.get('/categories', CategoriesController.getCategories)

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

const PORT = process.env.PORT || 3001

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
})