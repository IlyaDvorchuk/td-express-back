import {Router} from 'express'
import {loginValidation, registerValidation} from "../validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import {UserController} from "../controllers/index.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import authMiddleWare from "../middlewares/authMiddleware.js";
import {body} from "express-validator";

export const router = new Router()

router.post('/register', registerValidation, handleValidationErrors, UserController.register)
router.post('/login', loginValidation, handleValidationErrors, UserController.login)
router.post('/logout', handleValidationErrors, UserController.logout)
router.post('/activate/',
    body('email', 'Неверный формат почты').isEmail(),
    handleValidationErrors, UserController.activate)
router.post('/check/',
    body('email', 'Неверный формат почты').isEmail(),
    handleValidationErrors, UserController.checkEmail
    )
router.get('/refresh', handleValidationErrors, authMiddleWare, UserController.refresh)
router.get('/users', handleValidationErrors, roleMiddleware(['CUSTOMER']), UserController.getUsers)
