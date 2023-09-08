import {Socket} from 'socket.io-client';
import io from 'socket.io-client';
import {SOCKET} from './constants';

// const server = 'http://192.168.2.29:3001';
const server = 'http://localhost:3001';

export class SocketIOClient {
  private static instance: SocketIOClient;
  private socket!: Socket; // Using "!" to indicate that it will be assigned later

  private constructor() {
    this.initializeSocketIO();
  }

  static getInstance(): SocketIOClient {
    if (!SocketIOClient.instance) {
      SocketIOClient.instance = new SocketIOClient();
    }
    return SocketIOClient.instance;
  }

  private initializeSocketIO() {
    this.socket = io(server);

    this.socket.on('connect', () => {
      console.log(`Connected to ${server}`);
    });

    this.socket.on('disconnect', () => {
      console.log(`Disconnect to ${server}`);
    });

    this.socket.on('create_user', data => {
      // Handle user creation here
      console.log('create_user');
    });
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  emitJoinRoom(data: string) {
    this.socket.emit(SOCKET.JOIN_ROOM, data);
  }

  emitSendAcceptBooking(data: any) {
    this.socket.emit(SOCKET.SEND_ACCEPT_BOOKING, data);
  }

  onListenCustomerLocation(callback: (data: any) => void) {
    this.socket.on(SOCKET.SEND_CUSTOMER_LOCATION, data => {
      callback(data);
    });
  }
}
