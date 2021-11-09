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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenRequire = void 0;
const user_useCase_1 = require("../useCases/user.useCase");
const authenRequire = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req = _req;
        const token = req.headers.authorization;
        const userData = yield user_useCase_1.userUseCase.checkTokenValid(token);
        req.user = userData;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.authenRequire = authenRequire;
