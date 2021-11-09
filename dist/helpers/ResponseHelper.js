"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = exports.errorResponse = exports.successResponse = void 0;
const ExceptionCode_1 = __importDefault(require("../exceptions/ExceptionCode"));
const successResponse = ({ req, res, data, status_code, message }) => {
    const statusCode = status_code || 200;
    return res.status(statusCode).send({
        success: true,
        message: message || 'SUCCESS',
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = ({ req, res, status_code, message, exception_code }) => {
    const statusCode = status_code || 500;
    return res.status(statusCode).send({
        success: false,
        message,
        exception_code,
    });
};
exports.errorResponse = errorResponse;
exports.ResponseHelper = {
    successResponse: exports.successResponse,
    errorResponse: exports.errorResponse,
};
