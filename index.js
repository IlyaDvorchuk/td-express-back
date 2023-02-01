import mongoose from "mongoose";
import express from "express";
// import multer from 'multer'

mongoose
    .connect(
        'mongodb+srv://admin:iiiiii@cluster0.0sk2qea.mongodb.net/blog?retryWrites=true&w=majority'
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

app.use(express.json())
app.use('/uploads', express.static('uploads'))

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

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server Ok')
})