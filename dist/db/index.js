"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectWithRetry = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'youtubeshare';
const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;
const connectWithRetry = function () {
    return mongoose_1.default.connect(mongoUrl, {}, (err) => {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec');
            console.log(err);
            setTimeout(exports.connectWithRetry, 5000);
        }
        else {
            console.log('connect db success');
        }
    });
};
exports.connectWithRetry = connectWithRetry;
