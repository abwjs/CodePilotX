import { Server as SocketIOServer} from 'socket.io';
import { handleCollabEvents } from "./collab";
export const initSocket = (io: SocketIOServer) => {
  //连接函数
  io.on("connection", (socket: any) => {
    console.log(`${socket.id}连接`);
    //协同编辑器处理函数
    handleCollabEvents(socket);
    //聊天处理函数

    //断开连接
    io.on("dropRequest", () => {
      console.log(`${socket.id}断开连接`);
    });
  });
};
