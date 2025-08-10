import WebSocket from 'ws';
export class Session {
  public clientID: string = this.generateUniqueId();

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
}
