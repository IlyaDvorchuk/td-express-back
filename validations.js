import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('firstName', 'Укажите имя').isLength({min: 3}),
    body('secondName', 'Укажите фамилию').isLength({min: 3}),
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
]
