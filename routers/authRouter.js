import {Router} from 'express'
import {loginValidation, registerValidation} from "../validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import {UserController} from "../controllers/index.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import authMiddleWare from "../middlewares/authMiddleware.js";

export const router = new Router()

router.post('/register', registerValidation, handleValidationErrors, UserController.register)
router.post('/login', loginValidation, handleValidationErrors, UserController.login)
router.post('/logout', handleValidationErrors, UserController.logout)
router.get('/activate/', handleValidationErrors, UserController.activate)
router.get('/refresh', handleValidationErrors, authMiddleWare, UserController.refresh)
router.get('/users', handleValidationErrors, roleMiddleware(['CUSTOMER']), UserController.getUsers)