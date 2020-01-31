import { Router } from 'express';

// controllers
import SessionController from './app/contollers/SessionController';
import RecipientController from './app/contollers/RecipientController';

// importando o middleware que verifica se o usuário está autenticado
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// rota de login
routes.post('/session', SessionController.store);

// somente usuários logados poderão acessar as rotas a partir daqui
routes.use(authMiddleware);
// rota para cadastro de um destinatário
routes.post('/recipient', RecipientController.store);
// rota para edição de um destinatário
routes.put('/recipient/:id', RecipientController.update);

export default routes;
