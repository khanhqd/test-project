"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const crypto_1 = __importDefault(require("crypto"));
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'test-remitano';
const IV_LENGTH = 16; //* For AES, this is always 16
class EncryptionHelper {
    constructor() {
        this.genSalt = (rounds = 10) => {
            return (0, bcrypt_1.genSaltSync)(rounds);
        };
        this.hashPassword = (password, salt) => {
            return (0, bcrypt_1.hashSync)(`${password}${ENCRYPTION_KEY}`, salt);
        };
        this.verifyPassword = (password, hashPassword) => {
            return (0, bcrypt_1.compareSync)(`${password}${ENCRYPTION_KEY}`, hashPassword);
        };
        this.encrypt = (text) => {
            const iv = crypto_1.default.randomBytes(IV_LENGTH);
            const cipher = crypto_1.default.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return iv.toString('hex') + ':' + encrypted.toString('hex');
        };
        this.decrypt = (text) => {
            const textParts = text.split(':');
            const iv = Buffer.from(textParts.shift(), 'hex');
            const encryptedText = Buffer.from(textParts.join(':'), 'hex');
            const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        };
    }
}
;
exports.default = new EncryptionHelper;
