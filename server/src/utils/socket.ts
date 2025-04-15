import http from "http";
import express from "express";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

// 定义用户ID和socket ID的映射表类型
export interface UserSocketMapType {
  [userId: string]: string;
}

// 用户id和socketid的映射表
export const UserSocketMap: UserSocketMapType = {};

// 通过用户id获取socketid
const getSocketIdByUserId = (userId: string): string | undefined => {
  return UserSocketMap[userId];
};

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3031",
    methods: ["GET", "POST"],
  },
});

// 连接事件
io.on("connection", (socket: Socket) => {
  console.log("user connected:", socket.id);
  
  // 获取参数并明确类型
  const userId = socket.handshake.query.userId as string; // 假设userId是字符串类型
  if (userId) {
    UserSocketMap[userId] = socket.id;
  }
  console.info("UserSocketMap:", UserSocketMap);
  
  // 广播在线列表
  io.emit("online-users", Object.keys(UserSocketMap));

  // 加入房间
  socket.on("join-room", (groupId: string) => {
    socket.join(groupId);
    console.log(socket.id, "join room", groupId);
  });

  // 离开房间
  socket.on("leave-room", (groupId: string) => {
    socket.leave(groupId);
    console.log(socket.id, "user leave room", groupId);
  });

  // 断开连接
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId) {
      delete UserSocketMap[userId];
    }
    io.emit("online-users", Object.keys(UserSocketMap));
  });
});

export { app, io, server, getSocketIdByUserId };