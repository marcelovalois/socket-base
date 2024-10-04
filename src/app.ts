import { notFoundMiddleware, errorHandlerMiddleware } from "./middlewares/errorMiddlewares";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/api";

import("dotenv/config");

const app = express();

const allowedOrigins = ["https://pontuando.netlify.app", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Verifica se a origem está na lista de permitidas ou se não há uma origem (ex. requisições de ferramentas como Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Não permitido pelo CORS"));
      }
    },
    credentials: true, // Permite cookies em solicitações entre domínios
  }),
); // Adiciona cabeçalhos HTTP necessários para permitir solicitações de diferentes origens
app.use(express.json()); // O middleware interpreta e converte os dados JSON que vem no req.body
app.use(express.urlencoded({ extended: true })); // Lida com dados provenientes de formulários HTML
app.use(morgan("dev")); // Biblioteca para log de requisições HTTP
app.use(cookieParser(process.env.COOKIE_SECRET)); // Analisa os cookies do cabeçalho HTTP
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET as string,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true, httpOnly: true, sameSite: "strict" },
//   }),
// ); // Middleware de sessão
// app.use(csurf({ cookie: { httpOnly: true, secure: true, sameSite: "strict" } })); // Middleware de proteção contra CSRF
app.use("/api", routes); // Rotas da API
app.use(notFoundMiddleware, errorHandlerMiddleware); // Middlewares de tratamento de erro

export default app;
