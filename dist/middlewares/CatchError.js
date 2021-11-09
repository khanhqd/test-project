"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const ExceptionCode_1 = __importDefault(require("../exceptions/ExceptionCode"));
const ResponseHelper_1 = require("../helpers/ResponseHelper");
const catchError = (err, req, res, next) => {
    const defaultMessage = `Something went wrong`;
    const defaultExceptionCode = ExceptionCode_1.default.UNKNOWN;
    let message = '';
    let exceptionCode = 0;
    let statusCode = 0;
    if (err.message) {
        message = err.message;
    }
    if (err.code) {
        exceptionCode = err.code;
    }
    if (err.status_code) {
        statusCode = err.status_code;
    }
    return ResponseHelper_1.ResponseHelper.errorResponse({
        req,
        res,
        status_code: statusCode,
        message: message || defaultMessage,
        exception_code: exceptionCode || defaultExceptionCode,
    });
};
exports.catchError = catchError;
