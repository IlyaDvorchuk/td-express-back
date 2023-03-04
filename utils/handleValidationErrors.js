import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/api-error.js";

export default (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
    }

    next()
}