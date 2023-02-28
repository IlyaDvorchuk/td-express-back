import {Router} from 'express'
import {loginValidation, registerValidation} from "../validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import {UserController} from "../controllers/index.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

export const router = new Router()

router.post('/register', registerValidation, handleValidationErrors, UserController.register)
router.post('/login', loginValidation, handleValidationErrors, UserController.login)
router.post('/logout')
router.get('/activate/:link')
router.get('/refresh')
router.get('/users', handleValidationErrors, roleMiddleware(['CUSTOMER']), UserController.getUsers)