import express from 'express';

export const registerRouters = () => {
    const routers = express.Router();

    routers.get('/healthcheck', (req, res, next) => {
        return res.json('Healthcheck successfully');
    });

    return routers;
};
