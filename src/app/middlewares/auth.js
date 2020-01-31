import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

// middleware na verdade é uma função de que recebe além da requisição e resposta um next
export default async (req, res, next) => {
  // pegando o token dos headers da requisição
  const authHeader = req.headers.autorization;

  // caso não exista o token, já retorna menssagem de erro
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  // separando o autorization para pegar somente o token
  const [, token] = authHeader.split(' ');
  try {
    // verificando se o token é valido e caso não seja retorna menssagem de erro no catch
    await promisify(jwt.verify)(token, authConfig.secret);
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
  // estando tudo ok, segue a execução da aplicação
  return next();
};
