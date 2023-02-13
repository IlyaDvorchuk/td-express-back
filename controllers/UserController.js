import bcrypt from "bcrypt";
import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            passwordHash: hash
        })

        const user = await doc.save()

        const token = jwt.sign(
            {
                id: user._id
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        )

        const {passwordHash, ...userData} = user._doc

        res.json({
            userData,
            token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        })
    }

}