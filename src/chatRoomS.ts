// For room separation
import { ChatRoom } from "./chatroom.js";

export class ChatRooms {
  private rooms: ChatRoom[] = [];

  public createRoom(name: string, isPrivate: boolean = false, password: string = ""): ChatRoom {
    const newRoom = new ChatRoom();
    newRoom.roomName = name;
    newRoom.roomPrivate = isPrivate;
    newRoom.roomPassword = password;
    this.rooms.push(newRoom);
    return newRoom;
  }

  public getRooms(): ChatRoom[] {
    return this.rooms;
  }

  public removeRoom(room: ChatRoom) {
    const index = this.rooms.indexOf(room);
    if (index > -1) {
      this.rooms.splice(index, 1);
    }
  }
}
