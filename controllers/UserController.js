import {UserService} from "../service/user-service.js";

export const register = async (req, res, next) => {
    try {
        const userData = await UserService.registration(req.body)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)
        // TODO if will https - add secure: true
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const userData = await UserService.login(email, password)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)

    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies
        const token = await UserService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json(token)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const activate = async (req, res, next) => {
    try {
        const activationLink = req.params.link
        await UserService.activate(activationLink)
        return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const refresh =  async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies
        const userData = await UserService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers()
        return res.json(users)
    } catch (err) {
        console.log(err)
        next(err)
    }
}