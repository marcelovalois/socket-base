import { Server as SocketIOServer, Socket } from 'socket.io';

class SocketManager {

    constructor(private io: SocketIOServer) {
        this.handleSocketConnection();
    }

    private handleSocketConnection(): void {
        this.io.on('connection', (socket: Socket) => {
            // console.log('A client has just connected');

            socket.on('sendMessageToServer', async data => {
                socket.broadcast.emit('sendMessageToClient', data);
            });

            socket.on('sendMessageToChatServer', async data => {
                socket.broadcast.emit('sendMessageToChatClient', data);
            });
        });
    }
}

export default SocketManager;
