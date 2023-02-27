import bcrypt from "bcrypt";
import UserModel from '../models/User.js'
import RoleModel from '../models/Role.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'

export const register = async (req, res) => {
    try {
        const {password, email} = req.body

        const candidate = await UserModel.findOne({email})

        if (candidate) {
            return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const userRole = await RoleModel.findOne({value: "CUSTOMER"})

        const doc = new UserModel({
            email: req.body.email,
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            passwordHash: hash,
            role: [userRole.value]
        })

        const user = await doc.save()

        const token = jwt.sign(
            {
                id: user._id
            },
            config.secret,
            {
                expiresIn: '24h',
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

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                roles: user.roles
            },
            config.secret,
            {
                expiresIn: '24h',
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
            message: 'Не удалось авторизоваться',
        })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.json(users)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось отправить данные',
        })
    }
}