import WebSocket from "ws";
import { Session } from "./session.js";
import { ChatRoom } from "./chatroom.js";

// Template of a message syntax
// {"type": "messageType", "THE_data": "Bro is handsome"}

export function parseMessage(message: any): string | null{
  try {
    let msg: string;
    if (Buffer.isBuffer(message)) { // Remark: It basically send buffer to here OwOb
      msg = message.toString(); // Convert Buffer to string
    } else {
      msg = JSON.stringify(message);
    }
    return msg;
  } catch (error) {
    console.error('[Message] Failed to parse message:', error);
    return null;
  }
}

export function sendClientMessage(ws: WebSocket, message: any) {
  ws.send(JSON.stringify(message)) // Send message to target client
}

export function sendAllClientMessage(sessions: Session[], message: any) {
  sessions.forEach(session => {
    if (session.socket) {
      sendClientMessage(session.socket, message);
    }
  });
}

export function handleMessage(message: any, ws: WebSocket, session: Session, sessions: Session[]) {
  let msg: string;
  // Check if the message is a Buffer and convert it to a string
  if (Buffer.isBuffer(message)) { // Remark: It basically send buffer to here OwOb
    msg = message.toString(); // Convert Buffer to string
  } else {
    msg = JSON.stringify(message);
  }
  console.log(`[Message - ${session.clientID}] Received message: ${msg}`);
  // Handle the message as needed
  const data = JSON.parse(msg);
  switch (data.type) { // Handle All incoming messages here if you wanted, Optional
    case "messageType": // Example Message
      // Handle the specific message type

      // Example:
      console.log(`[Message - ${session.clientID}] THE_data: ${data.THE_data}`);
      // Console> [Message - ${session.clientID}] THE_data: Bro is Handsome

      break;

    case "c2c_msg":
      console.log(`[Message - ${session.clientID}] c2c_msg: ${data.c2c_msg}; To: ${data.target}`);
      // Example of sending a message to another client
      const targetSession = sessions.find(s => s.clientID === data.target);
      if (targetSession) {
        targetSession.c2c_sendMessage({ type: "c2c_msg_rcv", c2c_msg: data.c2c_msg }, targetSession);
      } else {
        console.warn(`[Message - ${session.clientID}] Target session not found: ${data.target}`);
      }
      break;
  
    default:
      console.warn(`[Message - ${session.clientID}] Unknown message type: ${data.type}`);
  }
}

// Wrapper of ChatRoom messages which designed for ChatRoom Example only
export function handleChatRoomMessage(message: any, ws: WebSocket, session: Session, chatRoom: ChatRoom) {
  let msg: string;
  if (Buffer.isBuffer(message)) {
    msg = message.toString();
  } else {
    msg = JSON.stringify(message);
  }
  console.log(`[ChatRoom - ${session.clientID}] Received message: ${msg}`);
  
  const data = JSON.parse(msg);
  switch (data.type) {
    case "cr_joined":
      session.name = data.name;
      console.log(`[ChatRoom - ${session.clientID}] ${session.name} joined the chat room`);
      chatRoom.addClient(session);
      break;
    case "cr_left":
      console.log(`[ChatRoom - ${session.clientID}] ${session.name} left the chat room`);
      chatRoom.removeClient(session);
      break;
    case "cr_msg":
      console.log(`[ChatRoom - ${session.clientID}] ${session.name} sent a message: ${data.content}`);
      chatRoom.broadcastMessage({ type: "cr_msg_toClient", content: data.content, sender: session.name });
      break;
    default:
      console.warn(`[ChatRoom - ${session.clientID}] Unknown chat message type: ${data.type}`);
  }
}
