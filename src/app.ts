import { notFoundMiddleware, errorHandlerMiddleware } from "./middlewares/errorMiddlewares";
import express from "express";
import session from "express-session";
// import csurf from "csurf";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

import("dotenv/config");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Permite cookies em solicitações entre domínios
  }),
); // Adiciona cabeçalhos HTTP necessários para permitir solicitações de diferentes origens
app.use(express.json()); // O middleware interpreta e converte os dados JSON que vem no req.body
app.use(express.urlencoded({ extended: true })); // Lida com dados provenientes de formulários HTML
app.use(morgan("dev")); // Biblioteca para log de requisições HTTP
app.use(cookieParser(process.env.COOKIE_SECRET)); // Analisa os cookies do cabeçalho HTTP
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, sameSite: "strict" },
  }),
); // Middleware de sessão
// app.use(csurf({ cookie: { httpOnly: true, secure: true, sameSite: "strict" } })); // Middleware de proteção contra CSRF
app.use(routes);
app.use(notFoundMiddleware, errorHandlerMiddleware); // Middlewares de tratamento de erro

export default app;
