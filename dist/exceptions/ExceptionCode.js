"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
var ExceptionCode;
(function (ExceptionCode) {
    ExceptionCode[ExceptionCode["UNKNOWN"] = 1] = "UNKNOWN";
    ExceptionCode[ExceptionCode["VALIDATE_FAILED"] = 2] = "VALIDATE_FAILED";
    ExceptionCode[ExceptionCode["REQUEST_INVALID"] = 403] = "REQUEST_INVALID";
    ExceptionCode[ExceptionCode["TOKEN_INVALID"] = 401] = "TOKEN_INVALID";
    ExceptionCode[ExceptionCode["PASSWORD_NOT_MATCH"] = 101] = "PASSWORD_NOT_MATCH";
    ExceptionCode[ExceptionCode["USER_NOT_FOUND"] = 201] = "USER_NOT_FOUND";
    ExceptionCode[ExceptionCode["LINK_TYPE_NOT_SUPPORT"] = 202] = "LINK_TYPE_NOT_SUPPORT";
    ExceptionCode[ExceptionCode["CAN_GET_VIDEO_INFO"] = 203] = "CAN_GET_VIDEO_INFO";
})(ExceptionCode || (ExceptionCode = {}));
exports.default = ExceptionCode;
