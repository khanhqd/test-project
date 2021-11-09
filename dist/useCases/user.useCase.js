"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUseCase = void 0;
const User_schema_1 = __importDefault(require("../db/schema/User.schema"));
const exception_1 = __importDefault(require("../exceptions/exception"));
const ExceptionCode_1 = __importDefault(require("../exceptions/ExceptionCode"));
const ExceptionName_1 = __importDefault(require("../exceptions/ExceptionName"));
const EncryptHelper_1 = __importDefault(require("../helpers/EncryptHelper"));
const JwtHelper_1 = require("../helpers/JwtHelper");
const loginOrRegister = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let userExisted = yield User_schema_1.default.findOne({
        email: params.email,
    });
    if (userExisted) {
        // begin login
        const checkPass = EncryptHelper_1.default.verifyPassword(params.password, userExisted.password);
        if (!checkPass) {
            throw new exception_1.default(ExceptionName_1.default.PASSWORD_NOT_MATCH, ExceptionCode_1.default.PASSWORD_NOT_MATCH);
        }
        let token = JwtHelper_1.JWTHelper.getToken({ email: params.email });
        return {
            email: userExisted.email,
            token,
        };
    }
    // begin register
    const salt = EncryptHelper_1.default.genSalt(10);
    const hashedPassword = EncryptHelper_1.default.hashPassword(params.password, salt);
    let newUser = new User_schema_1.default({
        email: params.email,
        password: hashedPassword,
        salt,
    });
    yield newUser.save();
    let token = JwtHelper_1.JWTHelper.getToken({ email: params.email });
    return {
        email: params.email,
        token,
    };
});
const checkTokenValid = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new exception_1.default(ExceptionName_1.default.TOKEN_INVALID, ExceptionCode_1.default.TOKEN_INVALID);
    }
    const tokenData = JwtHelper_1.JWTHelper.decode(token);
    if (!tokenData) {
        throw new exception_1.default(ExceptionName_1.default.TOKEN_INVALID, ExceptionCode_1.default.TOKEN_INVALID);
    }
    const { email } = tokenData;
    if (!email) {
        throw new exception_1.default(ExceptionName_1.default.TOKEN_INVALID, ExceptionCode_1.default.TOKEN_INVALID);
    }
    let userExisted = yield User_schema_1.default.findOne({
        email,
    });
    if (!userExisted) {
        throw new exception_1.default(ExceptionName_1.default.USER_NOT_FOUND, ExceptionCode_1.default.USER_NOT_FOUND);
    }
    return {
        email,
        id: userExisted.id,
    };
});
exports.userUseCase = {
    loginOrRegister,
    checkTokenValid,
};
