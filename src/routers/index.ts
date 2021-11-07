import { Router } from 'express';
import { userController } from 'src/controllers/user.controller';

const routers = Router();

routers.post('/login', userController.loginOrRegister)

routers.get('/healthcheck', (req, res, next) => {
	return res.json('Healthcheck successfully');
});

export default routers;
