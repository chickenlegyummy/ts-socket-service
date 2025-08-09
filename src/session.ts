import WebSocket from 'ws';

declare module 'ws' {
  interface WebSocket {
    clientId: string;
  }
}

export class Session {
  private clients: Set<WebSocket> = new Set();

  // Generate Random Client ID
  public generateUniqueId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public addClient(ws: WebSocket) {
    this.clients.add(ws);
    ws.clientId = this.generateUniqueId();
  }

  public removeClient(ws: WebSocket) {
    this.clients.delete(ws);
  }

  public getClients(): Set<WebSocket> {
    return this.clients;
  }

  public getClientById(clientId: string): WebSocket | undefined {
    return Array.from(this.clients).find(ws => ws.clientId === clientId);
  }
}
