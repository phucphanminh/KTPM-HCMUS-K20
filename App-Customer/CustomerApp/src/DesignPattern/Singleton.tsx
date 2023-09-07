import {Socket} from 'socket.io-client';
import io from 'socket.io-client';

class SocketIOClient {
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
    this.socket = io('https://your-socket-io-server-url.com');

    this.socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });

    this.socket.on('create_user', (data: any) => {
      // Handle user creation here
      console.log(`User created: ${JSON.stringify(data)}`);
    });
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  emitCreateUser(user_data: any) {
    this.socket.emit('create_user', user_data);
  }
}

// // Usage example
// const socketIOClient = SocketIOClient.getInstance();
// socketIOClient.connect();

// const user_data = {
//   username: 'example_user',
//   email: 'user@example.com',
// };

// socketIOClient.emitCreateUser(user_data);

// // When done, disconnect from the server
// socketIOClient.disconnect();
