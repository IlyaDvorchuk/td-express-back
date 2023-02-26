import {Router} from 'express'
import {loginValidation, registerValidation} from "../validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import {UserController} from "../controllers/index.js";

export const router = new Router()

router.post('/register', registerValidation, handleValidationErrors, UserController.register)
router.post('/login', loginValidation, handleValidationErrors, UserController.login)
router.get('/users', UserController.getUsers)