import { Server as SocketIOServer, Socket } from 'socket.io';
import myCache from '../services/cache';

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
                let users: UserData[] = myCache.get('users') || [];
                users = users.filter(user => user.id !== socket.id);
                myCache.set('users', users);
                socket.broadcast.emit('removeContactFromClient', socket.id);
            });
        });
    }
}

export default SocketManager;
