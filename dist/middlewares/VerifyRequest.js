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
exports.verifyRequest = void 0;
const ExceptionCode_1 = __importDefault(require("../exceptions/ExceptionCode"));
const ExceptionName_1 = __importDefault(require("../exceptions/ExceptionName"));
const ResponseHelper_1 = require("../helpers/ResponseHelper");
const md5 = require('crypto-js/md5');
const SK = 'remitano-test-exam';
const genSignature = (obj) => {
    let args = Object.keys(obj).sort().map((k) => { return obj[k]; });
    console.log(args.join(''));
    let signature = md5(args.join('') + SK).toString();
    return signature;
};
const verifySignature = function (params, req, res) {
    try {
        let _params = Object.assign({}, params);
        let now = new Date().getTime();
        if (!params.ts || Math.abs(params.ts - now) > 10000) {
            ResponseHelper_1.ResponseHelper.errorResponse({
                req,
                res,
                exception_code: ExceptionCode_1.default.REQUEST_INVALID,
                message: ExceptionName_1.default.REQUEST_INVALID,
            });
            return false;
        }
        delete _params.sign;
        let _sign = genSignature(_params);
        if (_sign !== params.sign) {
            ResponseHelper_1.ResponseHelper.errorResponse({
                req,
                res,
                exception_code: ExceptionCode_1.default.REQUEST_INVALID,
                message: ExceptionName_1.default.REQUEST_INVALID,
            });
            return false;
        }
        return true;
    }
    catch (e) {
        ResponseHelper_1.ResponseHelper.errorResponse({
            req,
            res,
            exception_code: ExceptionCode_1.default.REQUEST_INVALID,
            message: (e === null || e === void 0 ? void 0 : e.message) || ExceptionName_1.default.REQUEST_INVALID,
        });
        return false;
    }
};
const verifyRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = req.method === 'GET' ? req.query : req.body;
    let verifyRes = yield verifySignature(obj, req, res);
    if (!verifyRes)
        return;
    next();
});
exports.verifyRequest = verifyRequest;
