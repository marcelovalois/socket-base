import { notFoundMiddleware, errorHandlerMiddleware } from './errorMiddlewares';
import cors from 'cors';
import morgan from 'morgan';
import express, { Application } from 'express';
import routes from '../routes/routes';

const setupMiddlewares = (app: Application) => {
    app.use(cors()); // Adiciona cabeçalhos HTTP necessários para permitir solicitações de diferentes origens
    app.use(express.json()); // O middleware interpreta e converte os dados JSON que vem no req.body
    app.use(express.urlencoded({ extended: true })) // Lida com dados provenientes de formulários HTML
    app.use(morgan('dev')) // Biblioteca para log de requisições HTTP
    app.use(routes);
    app.use(notFoundMiddleware, errorHandlerMiddleware); // Middlewares de tratamento de erro
};

export default setupMiddlewares;
