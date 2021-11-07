import { Request as ExpressRequest, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ResponseHelper } from 'src/helpers/ResponseHelper';
import { validate } from 'src/helpers/Validation';
import { userUseCase } from 'src/useCases/user.useCase';

const loginOrRegister = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { email, password } = validate(req.body).valid({
			email: Joi.string().trim().email().required(),
			password: Joi.string().trim().min(6).max(32).required(),
		});

		const authData = await userUseCase.loginOrRegister({
			email,
			password,
		});

		return ResponseHelper.successResponse({ req, res, data: authData });
	} catch (e) {
		return next(e);
	}
};

export const userController = {
	loginOrRegister,
}
