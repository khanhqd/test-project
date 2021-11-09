"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const user_controller_1 = require("../controllers/user.controller");
const AuthenRequire_1 = require("../middlewares/AuthenRequire");
const routers = (0, express_1.Router)();
routers.post('/login', user_controller_1.userController.loginOrRegister);
routers.get('/posts', post_controller_1.postController.getPosts);
routers.post('/posts/create', AuthenRequire_1.authenRequire, post_controller_1.postController.createPost);
routers.get('/healthcheck', (req, res, next) => {
    return res.json('Healthcheck successfully');
});
exports.default = routers;
