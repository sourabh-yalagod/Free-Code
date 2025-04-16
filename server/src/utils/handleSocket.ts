import { roomManager } from "./roomManager";

const handleSocket = (ws: any) => {
  ws.on("message", (data: any) => {
    try {
      const { userId, roomId, event, message } = JSON.parse(data.toString());
      console.log("From client : ", { userId, roomId });
      switch (event) {
        case "join-room":
          roomManager.joinRoom(roomId, userId, ws);
          break;
        case "share-code":
          roomManager.shareCode(roomId, userId, message);
          break;
      }

      JSON.stringify({ message: `User joined room.` });
    } catch (error) {
      ws.send(
        JSON.stringify({ message: `Socket Connection  ERROR : ${error}` })
      );
    }
  });
};

export default handleSocket;
