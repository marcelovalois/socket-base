import { Server as SocketIOServer, Socket } from 'socket.io';

class SocketManager {

    constructor(private io: SocketIOServer) {
        this.handleSocketConnection();
    }

    private handleSocketConnection(): void {
        this.io.on('connection', (socket: Socket) => {
            socket.emit('getId', socket.id);

            socket.on('sendMessageToServer', async (data: PontuandoMessages) => {
                socket.broadcast.emit('sendMessageToClient', data);
            });

            socket.on('sendMessageToChatServer', async (data: PontuandoMessages) => {
                socket.broadcast.emit('sendMessageToChatClient', data);
            });

            socket.on('disconnect', () => {
                console.log(`Client ${socket.id} disconnected`);
            });
        });
    }
}

export default SocketManager;
