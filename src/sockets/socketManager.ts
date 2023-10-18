import { Server as SocketIOServer, Socket } from 'socket.io';

class SocketManager {

    constructor(private io: SocketIOServer) {
        this.handleSocketConnection();
    }

    private handleSocketConnection(): void {
        this.io.on('connection', (socket: Socket) => {
            socket.emit('getId', socket.id);

            socket.on('sendMessageToServer', async (data: PontuandoMessage) => {
                socket.broadcast.emit('sendMessageToClient', data);
            });

            socket.on('sendMessageToChatServer', async (data: PontuandoMessage) => {
                socket.broadcast.emit('sendMessageToChatClient', data);
            });

            socket.on('disconnect', () => {
                socket.broadcast.emit('removeContactFromClient', socket.id);
            });
        });
    }
}

export default SocketManager;
