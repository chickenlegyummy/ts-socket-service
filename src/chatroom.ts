// Example for text chat room functionality
import { Session } from "./session.js";
import { sendAllClientMessage } from "./message.js";

export class ChatRoom {
  private clients: Session[] = [];
  public roomName: string = "";
  public roomPrivate: boolean = false;
  public roomPassword: string = "";

  public addClient(client: Session) {
    this.clients.push(client);
  }

  public removeClient(client: Session) {
    const index = this.clients.indexOf(client);
    if (index > -1) {
      this.clients.splice(index, 1);
    }
  }

  public broadcastMessage(message: any) {
    sendAllClientMessage(this.clients, message);
  }
}
