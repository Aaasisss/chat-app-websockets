"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const io = new Server(server, {
  cors: { origin: "http://localhost:3001", methods: ["GET", "POST"] },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("websocket initiated: " + socket.id);

  socket.on("send_message", (data) => {
    console.log(data);
    try {
      const regex = new RegExp(data.regex);
      console.log("regex");
      console.log(regex);
      const match = regex.test(data.message);
      console.log(match);
      socket.emit("receive_message", { result: !!match });
    } catch (error) {
      console.log(console.error());
    }
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
