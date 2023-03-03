import bcrypt from "bcrypt";
import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import {UserService} from "../service/user-service.js";

export const register = async (req, res) => {
    try {
        const userData = await UserService.registration(req.body)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)
        // TODO if will https - add secure: true
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