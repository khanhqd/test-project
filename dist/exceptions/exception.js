"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExceptionCode_1 = __importDefault(require("./ExceptionCode"));
class Exception extends Error {
    constructor(message, code = ExceptionCode_1.default.UNKNOWN, status_code = 500) {
        super(message);
        this.name = 'Exception';
        this.code = code;
        this.status_code = status_code;
    }
}
exports.default = Exception;
