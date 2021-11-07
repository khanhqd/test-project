import { Router } from 'express';
import { postController } from 'src/controllers/post.controller';
import { userController } from 'src/controllers/user.controller';

const routers = Router();

routers.post('/login', userController.loginOrRegister)
routers.get('/posts', postController.getPosts)

routers.get('/healthcheck', (req, res, next) => {
	return res.json('Healthcheck successfully');
});

export default routers;
