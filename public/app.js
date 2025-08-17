// app.js - Example Client Side, using plain JavaScript
// may use whatever way to write your frontend
// I don't prefer you use this as a template tho
// Since I am not doing frontend template this time

let ws;
let session = { clientID: null };

function initWebSocket() {
    // Use browser's native WebSocket API, not Node.js ws module
    ws = new WebSocket(`ws://localhost:3000`); // Change this so other computer/devices can connect
    
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

        switch (message.type) {
            case "welcome":
                console.log("Welcome message received:", message);
                session.clientID = message.clientID;
                document.getElementById("clientIDValue").innerText = session.clientID;
                break;
            case "c2c_msg_rcv":
                console.log("C2C message received:", message);
                updateC2CMessages(message);
                break;
            case "cr_msg_toClient":
                console.log("Chat Room message received:", message);
                updateChatRoomMessages(message);
                break;
            case "cr_msg_toClient_sep":
                console.log("Chat Room (Separate) message received:", message);
                updateChatRoomMessages_separate(message);
                break;
            case "cr_room_created":
                console.log("Chat Room created:", message);
                // Update the UI to reflect the new room
                AddRoomToList(message);
                break;
            default:
                console.warn("Unknown message type:", message.type);
        }
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

// Methods for updating DOM elements
function updateC2CMessages(message) {
    const c2cMessagesDiv = document.getElementById("c2cMessages");
    if (c2cMessagesDiv) {
        const messageElement = document.createElement("div");
        messageElement.innerText = `C2C Message from ${message.clientID}: ${message.c2c_msg}`;
        c2cMessagesDiv.appendChild(messageElement);
    }
}

function updateChatRoomMessages(message) {
    const chatRoomMessagesDiv = document.getElementById("chatRoomMessages");
    if (chatRoomMessagesDiv) {
        const messageElement = document.createElement("div");
        messageElement.innerText = `${message.sender}: ${message.content}`;
        chatRoomMessagesDiv.appendChild(messageElement);
    }
}

function updateChatRoomMessages_separate(message) {
    const chatRoomMessagesDiv = document.getElementById("chatRoomMessages-room");
    if (chatRoomMessagesDiv) {
        const messageElement = document.createElement("div");
        messageElement.innerText = `${message.sender}: ${message.content}`;
        chatRoomMessagesDiv.appendChild(messageElement);
    }
}

function AddRoomToList(room) {
    const roomListDiv = document.getElementById("roomList");
    if (roomListDiv) {
        const roomElement = document.createElement("div");
        roomElement.className = "room";
        roomElement.innerText = room.roomName;
        roomListDiv.appendChild(roomElement);
    }
}

// Methods for dom buttons
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

function setupC2CButton() {
    const button = document.getElementById("c2cButton");
    const targetInput = document.getElementById("targetInput");
    if (button) {
        button.addEventListener("click", () => {
            const message = { type: "c2c_msg", c2c_msg: `Hello from client ${session.clientID}`, target: targetInput.value };
            console.log("Sending C2C message:", message);
            sendMessage(message);
        });
    }
}

function setupChatRoomButton() {
    const button = document.getElementById("joinChatButton");
    if (button) {
        button.addEventListener("click", () => {
            const message = { type: "cr_joined", name: `${document.getElementById("nameInput").value}` };
            console.log("Sending Chat Room join message:", message);
            sendMessage(message);
        });
    }
}

function setupChatRoomMessageButton() {
    const button = document.getElementById("sendChatButton");
    if (button) {
        button.addEventListener("click", () => {
            const message = { type: "cr_msg", content: `${document.getElementById("chatMessageInput").value}` };
            console.log("Sending Chat Room message:", message);
            sendMessage(message);
        });
    }
}

function setupChatRoomButton_room() {
    const button = document.getElementById("joinChatButton-room");
    if (button) {
        button.addEventListener("click", () => {
            const message = { type: "cr_joined", name: `${document.getElementById("nameInput-room").value}` };
            console.log("Sending Chat Room join message:", message);
            sendMessage(message);
        });
    }
}

function setupChatRoomMessageButton_room() {
    const button = document.getElementById("sendChatButton-room");
    if (button) {
        button.addEventListener("click", () => {
            const message = { type: "cr_msg", content: `${document.getElementById("chatMessageInput-room").value}` };
            console.log("Sending Chat Room message:", message);
            sendMessage(message);
        });
    }
}

function setupChatRoomCreateButton() {
    const button = document.getElementById("createRoom");
    if (button) {
        button.addEventListener("click", () => {
            const message = {
                type: "cr_create",
                name: `${document.getElementById("roomNameInput").value}`,
                isPublic: document.getElementById("publicRoom").checked,
                password: document.getElementById("roomPasswordInput").value
            };
            console.log("Sending Chat Room create message:", message);
            sendMessage(message);
        });
    }
}

// Wait till the page loaded
document.addEventListener("DOMContentLoaded", () => {
    initWebSocket();
    setupSendButton();
    setupC2CButton();
    setupChatRoomButton();
    setupChatRoomMessageButton();
    setupChatRoomButton_room();
    setupChatRoomMessageButton_room();
    setupChatRoomCreateButton();
    console.log("Client-side script loaded and WebSocket initialized");
});