"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const VerifyRequest_1 = require("./middlewares/VerifyRequest");
const CatchError_1 = require("./middlewares/CatchError");
const routers_1 = __importDefault(require("./routers"));
const db_1 = require("./db");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
// connect DB
(0, db_1.connectWithRetry)();
// set default timezone
moment_timezone_1.default.tz.setDefault('Asia/Ho_Chi_Minh');
let PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'test') {
    PORT = 8008;
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
if (NODE_ENV !== 'test' && NODE_ENV !== 'development') {
    // verify request signature
    app.use(VerifyRequest_1.verifyRequest);
}
app.use(express_1.default.static(path.join(__dirname, 'web-build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'web-build', 'index.html'));
});
app.use('/api', routers_1.default);
app.use(CatchError_1.catchError);
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
module.exports = app; // for testing
