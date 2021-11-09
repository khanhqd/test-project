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
exports.postUseCase = void 0;
const Post_schema_1 = __importDefault(require("../db/schema/Post.schema"));
const User_schema_1 = __importDefault(require("../db/schema/User.schema"));
const exception_1 = __importDefault(require("../exceptions/exception"));
const ExceptionCode_1 = __importDefault(require("../exceptions/ExceptionCode"));
const ExceptionName_1 = __importDefault(require("../exceptions/ExceptionName"));
const YoutubeAPI_1 = __importDefault(require("../helpers/YoutubeAPI"));
const getListPost = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield Post_schema_1.default.find()
        .sort({ createAt: -1 })
        .skip(params.offset)
        .limit(params.limit)
        .populate('author', ['email']);
    if (!data)
        return { data: [], total: 0 };
    let total = yield Post_schema_1.default.countDocuments();
    return { data, total };
});
const SUPPORTED_LINKS = ['https://www.youtube.com/', 'https://youtu.be/', 'https://youtube.com/'];
const createPost = (params) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    if (!SUPPORTED_LINKS.some((i) => params.url.startsWith(i))) {
        throw new exception_1.default(ExceptionName_1.default.LINK_TYPE_NOT_SUPPORT, ExceptionCode_1.default.LINK_TYPE_NOT_SUPPORT);
    }
    const userExisted = yield User_schema_1.default.findById(params.userId);
    if (!userExisted) {
        throw new exception_1.default(ExceptionName_1.default.USER_NOT_FOUND, ExceptionCode_1.default.USER_NOT_FOUND);
    }
    let videoInfo = yield YoutubeAPI_1.default.getVideoInfo(params.url);
    if (!videoInfo) {
        throw new exception_1.default(ExceptionName_1.default.CAN_GET_VIDEO_INFO, ExceptionCode_1.default.CAN_GET_VIDEO_INFO);
    }
    let post = new Post_schema_1.default({
        author: params.userId,
        url: params.url,
        title: (_a = videoInfo.snippet) === null || _a === void 0 ? void 0 : _a.title,
        description: (_b = videoInfo.snippet) === null || _b === void 0 ? void 0 : _b.description,
        thumbnail: (_e = (_d = (_c = videoInfo.snippet) === null || _c === void 0 ? void 0 : _c.thumbnails) === null || _d === void 0 ? void 0 : _d.high) === null || _e === void 0 ? void 0 : _e.url,
        youtubeId: videoInfo.id,
    });
    yield post.save();
    return post;
});
exports.postUseCase = {
    getListPost,
    createPost,
};
