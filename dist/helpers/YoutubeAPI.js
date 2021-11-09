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
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
const url_1 = __importDefault(require("url"));
const query_string_1 = __importDefault(require("query-string"));
const API_KEY = 'AIzaSyDGr1YHwvnFICW-Uq6OpNW3WkFTPuEFLy4';
class YoutubeAPI {
    constructor() {
        this.getVideoId = (url) => {
            var _a;
            if (!url)
                return '';
            let parseObj = url_1.default.parse(url);
            if (url.indexOf('youtu.be') > 0) {
                return (_a = parseObj.pathname) === null || _a === void 0 ? void 0 : _a.replace('/', '');
            }
            if (url.indexOf('youtube.com/watch') > 0 && !!parseObj.query) {
                let objQuery = query_string_1.default.parse(parseObj.query);
                return objQuery === null || objQuery === void 0 ? void 0 : objQuery.v;
            }
            return '';
        };
        this.getVideoInfo = (url) => __awaiter(this, void 0, void 0, function* () {
            let videoId = this.getVideoId(url);
            if (!videoId)
                return;
            try {
                let res = yield axios_1.default.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoId}&key=${API_KEY}`);
                let videoItem = (0, lodash_1.get)(res, 'data.items[0]');
                if (!videoItem)
                    return;
                return videoItem;
            }
            catch (error) {
                return;
            }
        });
    }
}
exports.default = new YoutubeAPI;
