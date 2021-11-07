import User from "src/db/schema/User.schema";
import Exception from "src/exceptions/exception";
import ExceptionCode from "src/exceptions/ExceptionCode";
import ExceptionName from "src/exceptions/ExceptionName";
import EncryptHelper from "src/helpers/EncryptHelper";
import { JWTHelper } from "src/helpers/JwtHelper";

interface ILoginType {
	email: string,
	password: string,
}

const loginOrRegister = async (params: ILoginType) => {
	let userExisted = await User.findOne({
		email: params.email,
	});
	if (userExisted) {
		// begin login
		const checkPass = EncryptHelper.verifyPassword(params.password, userExisted.password);
		if (!checkPass) {
			throw new Exception(ExceptionName.PASSWORD_NOT_MATCH, ExceptionCode.PASSWORD_NOT_MATCH);
		}
		let token = JWTHelper.getToken({ email: params.email });
		return {
			email: userExisted.email,
			token,
		}
	}
	// begin register
	const salt = EncryptHelper.genSalt(10);
	const hashedPassword = EncryptHelper.hashPassword(params.password, salt);
	let newUser = new User({
		email: params.email,
		password: hashedPassword,
		salt,
	});
	await newUser.save();
	let token = JWTHelper.getToken({ email: params.email });
	return {
		email: params.email,
		token,
	}
}

const checkTokenValid = async (token?: string) => {
	if (!token) {
		throw new Exception(ExceptionName.TOKEN_INVALID, ExceptionCode.TOKEN_INVALID);
	}

	const tokenData = JWTHelper.decode(token);
	if (!tokenData) {
		throw new Exception(ExceptionName.TOKEN_INVALID, ExceptionCode.TOKEN_INVALID);
	}
	const { email } = tokenData;
	if (!email) {
		throw new Exception(ExceptionName.TOKEN_INVALID, ExceptionCode.TOKEN_INVALID);
	}

	let userExisted = await User.findOne({
		email,
	});
	if (!userExisted) {
		throw new Exception(ExceptionName.USER_NOT_FOUND, ExceptionCode.USER_NOT_FOUND);
	}

	return {
		email,
		id: userExisted.id,
	};
};

export const userUseCase = {
	loginOrRegister,
	checkTokenValid,
};
