// app.js (rename from app.ts and use plain JavaScript for browser)
let ws;

function initWebSocket() {
    // Use browser's native WebSocket API, not Node.js ws module
    ws = new WebSocket(`ws://localhost:3000`); // Use hardcoded port or get from window location
    
    ws.onopen = function() {
        console.log("WebSocket connection established");
    };
    
    ws.onmessage = function(event) {
        handleMessage(event.data);
    };
    
    ws.onclose = function() {
        console.log("WebSocket connection closed");
    };
    
    ws.onerror = function(error) {
        console.error("WebSocket error:", error);
    };
}

function handleMessage(data) {
    // Handle incoming messages from server
    try {
        const message = JSON.parse(data);
        console.log("Received message:", message);
        // Add your message handling logic here
    } catch (error) {
        console.error("Error parsing message:", error);
    }
}

function sendMessage(messageData) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(messageData));
    } else {
        console.error("WebSocket is not connected");
    }
}

function setupSendButton() {
    const button = document.getElementById("sendButton");
    if (button) {
        button.addEventListener("click", () => {
            const message = { type: "messageType", THE_data: "Bro is handsome" };
            console.log("Sending message:", message);
            sendMessage(message);
        });
    }
}

// Wait till the page loaded
document.addEventListener("DOMContentLoaded", () => {
    initWebSocket();
    setupSendButton();
    console.log("Client-side script loaded and WebSocket initialized");
});