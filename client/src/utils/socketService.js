/* eslint-disable no-unused-vars */
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://10.0.2.2:3000';

class WSService {
    initializeSocket = async() => {
        try {
            this.socket = io(SOCKET_SERVER_URL, {
                transports: ['websocket'],
            });
            this.socket.on('connect', (data) => {
                console.log('Connected to socket server',data);
            });
            this.socket.on('disconnect', (data) => {
                console.log('Disconnected from socket server',data);
            });
            this.socket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
            });
        } catch (error) {
            console.error('Error connecting to socket server:', error);
        }
    };
    emit = (event, data) => {
        this.socket.emit(event, data);
    }
    on = (event, callback) => {
        this.socket.on(event, callback);
    };
    removeListener = (listenerName) => {
        this.socket.removeListener(listenerName);
    };
}

const socketService = new WSService();
export default socketService;