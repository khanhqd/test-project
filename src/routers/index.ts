import { Router } from 'express';
import { postController } from 'src/controllers/post.controller';
import { userController } from 'src/controllers/user.controller';
import { authenRequire } from 'src/middlewares/AuthenRequire';

const routers = Router();

routers.post('/login', userController.loginOrRegister)
routers.get('/posts', postController.getPosts)
routers.post('/posts/create', authenRequire, postController.createPost)

routers.get('/healthcheck', (req, res, next) => {
	return res.json('Healthcheck successfully');
});

export default routers;
