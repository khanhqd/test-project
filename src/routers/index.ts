import express from 'express';
import { userController } from 'src/controllers/user.controller';

export const registerRouters = () => {
	const routers = express.Router();

	routers.post('/login', userController.loginOrRegister)

	routers.get('/healthcheck', (req, res, next) => {
		return res.json('Healthcheck successfully');
	});

	return routers;
};
