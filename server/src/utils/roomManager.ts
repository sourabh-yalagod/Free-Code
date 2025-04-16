interface Rooms {
  users: { userId: string; ws: any }[];
}

class RoomManager {
  private room: Map<string, Rooms> = new Map();
  constructor() {}
  joinRoom(roomId: string, userId: string, ws: any) {
    const room = this.room.get(roomId) || { users: [] };
    if (room?.users?.length >= 2) {
      ws.send(JSON.stringify({ message: `Room ${roomId} is Full` }));
      return;
    }
    room.users.push({ userId, ws });
    this.room.set(roomId, room);
    console.log(this.room.get(roomId));
    ws.send(JSON.stringify({ message: `user joined Room ${roomId}` }));

    ws.on("close", () => {
      this.leaveRoom(userId, roomId);
    });
  }
  leaveRoom(userId: string, roomId: string) {
    const room = this.room.get(roomId);
    if (!room) return;
    room.users = room?.users.filter((user) => user.userId != userId);
    if (room.users?.length == 0) {
      this.room.delete(userId);
    } else {
      this.room.set(roomId, room);
    }
    console.log("leaveRoom  : ", this.room.get(roomId));
  }

  shareCode(roomId: string, userId: any, message: string) {
    const room = this.room.get(roomId);
    if (!room) return;
    console.log("Message from CODE SHARE : ", message);
    for (const user of room.users) {
      if (user?.ws?.readyState == 1 && user.userId !== userId) {
        user.ws.send(
          JSON.stringify({
            message,
            userId,
          })
        );
      }
    }
  }
}
export const roomManager = new RoomManager();
