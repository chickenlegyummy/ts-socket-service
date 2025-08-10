import WebSocket from "ws";
import { Session } from "./session.js";

// Template of a message syntax
// {"type": "messageType", "THE_data": "Bro is handsome"}

export function sendClientMessage(ws: WebSocket, message: any) {
  ws.send(JSON.stringify(message))
}

// Below are two version of handleMessage, one is no Session used, one is for Session used cases

// export function handleMessage(ws: WebSocket, message: any) {
//   const msg = JSON.stringify(message);
//   console.log(`Received message: ${msg}`);
//   // Handle the message as needed
//   const data = JSON.parse(msg);
//   switch (data.type) { // Handle All incoming messages here if you wanted, Optional
//     case "messageType":
//       // Handle the specific message type

//       // Example:
//       console.log(`THE_data: ${data.THE_data}`);
//       // Console> Bro is Handsome

//       break;
//     default:
//       console.warn(`Unknown message type: ${data.type}`);
//   }
// }

export function handleMessage(message: any, ws: WebSocket, session: Session) {
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
    default:
      console.warn(`[Message - ${session.clientID}] Unknown message type: ${data.type}`);
  }
}
