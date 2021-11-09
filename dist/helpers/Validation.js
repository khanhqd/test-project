"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const exception_1 = __importDefault(require("../exceptions/exception"));
const ExceptionCode_1 = __importDefault(require("../exceptions/ExceptionCode"));
const validate = (input) => {
    const valid = (joiSchema) => {
        const schema = joi_1.default.object(joiSchema);
        const { error, value } = schema.validate(input, {
            allowUnknown: true,
        });
        if (error) {
            throw new exception_1.default(`Validation error: ${error.message}`, ExceptionCode_1.default.VALIDATE_FAILED);
        }
        return value;
    };
    return {
        valid,
    };
};
exports.validate = validate;
