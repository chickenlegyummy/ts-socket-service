import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import https from 'https';
import { join } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// import our custom services can edit content there according needs
import { sendClientMessage, handleMessage } from './message.js';
import { Session } from './session.js';

// ==== Below the Server Setup ==== 

const app = express();

dotenv.config();

// Try to setup HTTPS if SSL certificates are available
let server: http.Server | https.Server
let useHttps = false

// Self-signed certificate check, in case you need to use some trash like WebXR
try {
  // Check if VR-Script SSL certificates exist
  const keyPath = join('keys', 'server.key')
  const certPath = join('keys', 'server.crt')

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }
    server = https.createServer(httpsOptions, app)
    useHttps = true
    console.log('HTTPS server initialized with SSL certificates')
  } else {
    server = http.createServer(app)
    console.log('HTTP server initialized (SSL certificates not found)')
  }
} catch (error) {
  server = http.createServer(app)
  console.log('HTTP server initialized (SSL setup failed):', error)
}

const wss = new WebSocketServer({ server })

// ==== Handle WebSocket connections ====
// 收到 收唔到 唔係靠彩數

let sessions: Session[] = []; // Array to hold multiple sessions if needed

wss.on('connection', (ws) => {
  console.log('[Event] New client connected');

  const session = new Session();
  session.addClient(session, sessions);
  console.log(`[Session] New session created with clientID: ${session.clientID}`);
  console.log(`[Session] Current sessions: ${sessions.map(s => s.clientID).join(', ')}`);

  ws.on('message', (message) => {
    handleMessage(message, ws, session);
  });

  sendClientMessage(ws, { type: "welcome", notice: "Welcome to the WebSocket server!" });

  ws.on('close', () => {
    console.log('[Event] Client disconnected');
    session.removeClient(session, sessions);
    console.log(`[Session] Session with clientID ${session.clientID} removed`);
    console.log(`[Session] Current sessions: ${sessions.map(s => s.clientID).join(', ')}`);
  });
});

// =======================================

// Create the server with your desired port
const port = process.env.PORT || 3000; // Remember to adjust port if needed, at .env just create it at root
server.listen(port, () => {
  const protocol = useHttps ? 'https' : 'http'
  console.log(
    `${protocol.toUpperCase()} Server running on ${protocol}://localhost:${port}`,
  )
  console.log(
    `WebSocket server running on ${useHttps ? 'wss' : 'ws'}://localhost:${port}`,
  )
  // Print your routes with http/https full links
  if (useHttps) {
    console.log(`  Placeholder: https://localhost:${port}/placeholder`)
  } else {
    console.log(`  Placeholder: http://localhost:${port}/placeholder`)
  }
});

// ==== Above the Server Setup ==== 