import express from "express";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middlewares/errorMiddlewares";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

const app = express();

app.use(cors()); // Adiciona cabeçalhos HTTP necessários para permitir solicitações de diferentes origens
app.use(express.json()); // O middleware interpreta e converte os dados JSON que vem no req.body
app.use(express.urlencoded({ extended: true })); // Lida com dados provenientes de formulários HTML
app.use(morgan("dev")); // Biblioteca para log de requisições HTTP
app.use(routes);
app.use(notFoundMiddleware, errorHandlerMiddleware); // Middlewares de tratamento de erro

export default app;
