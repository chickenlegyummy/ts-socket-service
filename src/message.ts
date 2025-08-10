import WebSocket from "ws";
import { Session } from "./session.js";

// Template of a message syntax
// {"type": "messageType", "THE_data": "Bro is handsome"}

export function sendClientMessage(ws: WebSocket, message: any) {
  ws.send(JSON.stringify(message)) // Send message to target client
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
