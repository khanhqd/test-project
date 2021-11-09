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
exports.postController = void 0;
const joi_1 = __importDefault(require("joi"));
const ResponseHelper_1 = require("../helpers/ResponseHelper");
const Validation_1 = require("../helpers/Validation");
const AuthenRequire_1 = require("../middlewares/AuthenRequire");
const post_useCase_1 = require("../useCases/post.useCase");
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, offset } = (0, Validation_1.validate)(req.query).valid({
            limit: joi_1.default.number(),
            offset: joi_1.default.number(),
        });
        const data = yield post_useCase_1.postUseCase.getListPost({
            limit: limit || 20,
            offset: offset || 0,
        });
        return ResponseHelper_1.ResponseHelper.successResponse({ req, res, data });
    }
    catch (e) {
        return next(e);
    }
});
const createPost = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req = _req;
        const { url } = (0, Validation_1.validate)(req.body).valid({
            url: joi_1.default.string().trim().uri().required()
        });
        const { id: userId } = req.user;
        yield post_useCase_1.postUseCase.createPost({
            userId,
            url,
        });
        return ResponseHelper_1.ResponseHelper.successResponse({ req, res, data: true });
    }
    catch (e) {
        return next(e);
    }
});
exports.postController = {
    getPosts,
    createPost,
};
