import jwt from "jsonwebtoken";
import TokenModel from "../models/Token.js";

export default class TokenService {
    static generateTokens(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: '30m'
            }
        )
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: '30d'
            }
        )

        return {
            accessToken,
            refreshToken
        }
    };

    async static saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId})

    }
}