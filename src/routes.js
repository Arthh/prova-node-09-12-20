import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// USER

routes.get('/', (req, res) => res.json('alo'));
routes.post('/login', SessionController.store);
routes.post('/user', UserController.store);

routes.use(authMiddleware);

routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.put('/user/', UserController.update);
routes.delete('/userdelete/:id', UserController.delete);

export default routes;
