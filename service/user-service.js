import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import RoleModel from "../models/Role.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import uuid from 'uuid'
import mailService from "./mail-service.js";

export default class UserService {
    static async registration(userData) {
        const {password, email} = userData;д

        const candidate = await UserModel.findOne({email})

        if (candidate) {
            throw new Error(`Пользователь с почтовым адрессом ${email} уже существует`)
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const activationLink = uuid.v4()
        const userRole = await RoleModel.findOne({value: "CUSTOMER"})

        const user = await UserModel.create({
            email: userData.email,
            firstName: userData.firstName,
            secondName: userData.secondName,
            passwordHash: hash,
            role: [userRole.value],
            activationLink
        })

        await mailService.sendActivationMail(email, activationLink)

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
    }
}