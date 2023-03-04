import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import RoleModel from "../models/Role.js";
import {v4} from 'uuid'
import {MailService} from "./mail-service.js";
import tokenService from "./token-service.js";
import {UserDto} from "../dtos/user-dto.js";
import {ApiError} from "../exceptions/api-error.js";

export class UserService {
    static async registration(userData) {
        const {password, email} = userData;

        const candidate = await UserModel.findOne({email})

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адрессом ${email} уже существует`)
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

        await new MailService().sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    static async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }
}