require = require("esm")(module);
// HTTP SETUP
import { createServer } from "http";
import express from "express";
const app = express();
app.use(express.static("dist"));
const httpServer = createServer(app);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket-io
import { Server } from "socket.io";
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.emit("message", "Hello World");
});

httpServer.listen(3000, () => {
  console.log("listening on localhost:3000");
});
