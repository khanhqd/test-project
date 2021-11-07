import jwt from 'jwt-simple';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'kalvin'

export class JWTHelper {
    public static getToken(payload) {
        if (!payload.createdAt) {
            payload.createdAt = new Date().getTime();
        }
        var token = jwt.encode(payload, SECRET_KEY);
        return token;
    }

    public static decode(token) {
        try {
            var decoded = jwt.decode(token, SECRET_KEY);
            return decoded;
        } catch {
            return null;
        }
    }
}
