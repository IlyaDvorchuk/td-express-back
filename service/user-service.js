import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import RoleModel from "../models/Role.js";
import {v4} from 'uuid'
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import {UserDto} from "../dtos/user-dto.js";

export class UserService {
    static async registration(userData) {
        const {password, email} = userData;

        const candidate = await UserModel.findOne({email})

        if (candidate) {
            throw new Error(`Пользователь с почтовым адрессом ${email} уже существует`)
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const activationLink = v4()
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

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}