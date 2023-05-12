import express from "express";
import http from "http";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { PORT } from "./config.js";
import cors from "cors";

// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  // cors: {
  //   origin: "http://localhost:3000",
  // },
});
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "../client/build")));

io.on("connection", (socket) => {

  socket.broadcast.emit("connectedUser", io.sockets.sockets.size);
  console.log("El contador de usuarios es: ", io.sockets.sockets.size);

  socket.on("message", (body, from) => {
    console.log("Usuario ", from, " dijo ", body)
    socket.broadcast.emit("message", {
      body,
      from
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("disconnectedUser", io.sockets.sockets.size);
    console.log("Un usuario se desconectó. ", io.sockets.sockets.size, " usuarios restantes."); 
  });

});

server.listen(PORT);
console.log(`Sirviendo en el puerto ${PORT}`);
