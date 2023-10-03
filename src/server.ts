import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev')) // Biblioteca para log de requisições HTTP
app.use(routes);

// Configurando servidor para Socket
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    // console.log('A client has just connected');

    socket.on('sendMessageToServer', async data => {
        socket.broadcast.emit('sendMessageToClient', data);
    })
});


const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
    console.log("App listening on port " + PORT);
});
