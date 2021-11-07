import { Request as ExpressRequest, NextFunction, Response } from 'express';
import { userUseCase } from 'src/useCases/user.useCase';


export interface RequestAuthorized extends ExpressRequest {
	user: {
		email: string,
		id: string,
	};
}

export const authenRequire = async (_req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const req = _req as RequestAuthorized;

		const token = req.headers.authorization;

		const userData = await userUseCase.checkTokenValid(token);

		req.user = userData;

		next();
	} catch (err) {
		next(err);
	}

};

