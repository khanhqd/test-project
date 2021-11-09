"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTHelper = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'kalvin';
class JWTHelper {
    static getToken(payload) {
        if (!payload.createdAt) {
            payload.createdAt = new Date().getTime();
        }
        var token = jwt_simple_1.default.encode(payload, SECRET_KEY);
        return token;
    }
    static decode(token) {
        try {
            var decoded = jwt_simple_1.default.decode(token, SECRET_KEY);
            return decoded;
        }
        catch (_a) {
            return null;
        }
    }
}
exports.JWTHelper = JWTHelper;
