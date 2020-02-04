import { Router } from 'express';
import multer from 'multer';

// controllers
import SessionController from './app/contollers/SessionController';
import RecipientController from './app/contollers/RecipientController';
import FileController from './app/contollers/FileController';
import DeliverymanController from './app/contollers/DeliverymanController';

// importando o multer para permitir uplaod
import multerConfig from './config/multer';

// importando o middleware que verifica se o usuário está autenticado
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// instanciando o multer passando as configurações
const upload = multer(multerConfig);

// setando o multer

// rota de login
routes.post('/session', SessionController.store);

// somente usuários logados poderão acessar as rotas a partir daqui
routes.use(authMiddleware);

// rotas para manter destinatários
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

// rotas para manter entregadores
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// rota para upload de arquivos
// aqui passo um segundo middleware que é o multer pegando qual campo da requisição
routes.post('/file', upload.single('file'), FileController.store);

export default routes;
