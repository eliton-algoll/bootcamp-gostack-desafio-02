import express from 'express';
import { resolve } from 'path';
import routes from './routes';

// importando configuração dos models
import './database';

class App {
  constructor() {
    // iniciando o server
    this.server = express();

    // chamando os middlewares
    this.middlewares();

    // chamando as rotas
    this.routes();
  }

  // aqui estarão todos os middlewares globais
  middlewares() {
    // permitindo que a aplicação receba requisições com Json
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // aqui estarão importadas as rotas da aplicação
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
