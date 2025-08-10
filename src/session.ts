import WebSocket from 'ws';
import { sendClientMessage } from './message.js';

export class Session {
  // Necessary properties
  public clientID: string = this.generateUniqueId();
  public socket: WebSocket | null = null;

  // Optional properties
  public name: string | null = null;
  public chatRoomJoined: boolean | null = null;

  // Constructor
  constructor(socket: WebSocket) {
    this.socket = socket;
  }

  // Generate Random Client ID
  public generateUniqueId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public addClient(client: Session, list: Session[]) {
    list.push(client);
  }

  public removeClient(client: Session, list: Session[]) {
    const index = list.indexOf(client);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  // Client-to-client messaging example, wrapper of sendClientMessage
  public c2c_sendMessage(message: any, target: Session) {
    // Send Message to target ws
    if (target.socket) {
      sendClientMessage(target.socket, message);
    }
  }
}
