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
exports.userController = void 0;
const joi_1 = __importDefault(require("joi"));
const ResponseHelper_1 = require("../helpers/ResponseHelper");
const Validation_1 = require("../helpers/Validation");
const user_useCase_1 = require("../useCases/user.useCase");
const loginOrRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = (0, Validation_1.validate)(req.body).valid({
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().trim().min(6).max(32).required(),
        });
        const authData = yield user_useCase_1.userUseCase.loginOrRegister({
            email,
            password,
        });
        return ResponseHelper_1.ResponseHelper.successResponse({ req, res, data: authData });
    }
    catch (e) {
        return next(e);
    }
});
exports.userController = {
    loginOrRegister,
};
