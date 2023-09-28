import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev')) // Biblioteca para log de requisições HTTP

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



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("App listening on port " + PORT);
});
