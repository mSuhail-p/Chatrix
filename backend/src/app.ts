import express, { Express } from "express";
import cors from "cors";
import { createServer, get, METHODS } from "http";
import { Server } from "socket.io";

const app: Express = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(
    "a user successfully connected",
    "this is the id ",
    socket.id,
    "this is the id "
  );
  socket.on("chatMessage", (msg) => {
    console.log(msg, "it is the message form client");
    socket.broadcast.emit("chat message", msg);
  });

  //to disconnect the specific connection
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export default server;
