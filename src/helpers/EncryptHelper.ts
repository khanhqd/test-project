import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'test-remitano';
const IV_LENGTH = 16; //* For AES, this is always 16

class EncryptionHelper {

	genSalt = (rounds: number = 10) => {
		return genSaltSync(rounds);
	};

	hashPassword = (password: string, salt: string) => {
		return hashSync(`${password}${ENCRYPTION_KEY}`, salt);
	};

	verifyPassword = (password: string, hashPassword: string) => {
		return compareSync(`${password}${ENCRYPTION_KEY}`, hashPassword);
	};

	encrypt = (text: string) => {
		const iv = crypto.randomBytes(IV_LENGTH);
		const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
		let encrypted = cipher.update(text);

		encrypted = Buffer.concat([encrypted, cipher.final()]);

		return iv.toString('hex') + ':' + encrypted.toString('hex');
	};

	decrypt = (text: string) => {
		const textParts: any = text.split(':');
		const iv = Buffer.from(textParts.shift(), 'hex');
		const encryptedText = Buffer.from(textParts.join(':'), 'hex');
		const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

		let decrypted = decipher.update(encryptedText);

		decrypted = Buffer.concat([decrypted, decipher.final()]);

		return decrypted.toString();
	};

};

export default new EncryptionHelper;

