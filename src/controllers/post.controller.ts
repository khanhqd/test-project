import { Request as ExpressRequest, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ResponseHelper } from 'src/helpers/ResponseHelper';
import { validate } from 'src/helpers/Validation';
import { RequestAuthorized } from 'src/middlewares/AuthenRequire';
import { postUseCase } from 'src/useCases/post.useCase';

const getPosts = async (req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const { limit, offset } = validate(req.query).valid({
			limit: Joi.number(),
			offset: Joi.number(),
		});

		const data = await postUseCase.getListPost({
			limit: limit || 20,
			offset: offset || 0,
		});

		return ResponseHelper.successResponse({ req, res, data });
	} catch (e) {
		return next(e);
	}
};

const createPost = async (_req: ExpressRequest, res: Response, next: NextFunction) => {
	try {
		const req = _req as RequestAuthorized;

		const { url } = validate(req.body).valid({
			url: Joi.string().trim().uri().required()
		});

		const { id: userId } = req.user;

		await postUseCase.createPost({
			userId,
			url,
		})

		return ResponseHelper.successResponse({ req, res, data: true });
	} catch (e) {
		return next(e);
	}
}

export const postController = {
	getPosts,
	createPost,
}
