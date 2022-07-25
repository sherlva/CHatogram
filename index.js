const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const Users = require("./model/Users");
require("./helper/db")();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

async function getCurrentUser(id) {
  return await Users.findOne({ socketid: id });
}
async function leftUser(id) {
  return await Users.findOneAndDelete({ socketid: id });
}

io.on("connection", (socket) => {
  console.log("New WS connected...");

  // function Options(user, room, name) {
  //     return {

  //         date: new Date()
  //     }
  // }

  // function roomUser(room){

  // }

  // console.log(socket.id);
  socket.on("join", (options) => {
    const user = new Users({
      name: options.name,
      room: options.room,
      socketid: socket.id,
    });
    user.save();

    socket.join(user.room);

    socket.emit("bot", {
      user: { name: "bot" },
      msg: "Welcome to the chat",
    }); // Salomlashish

    socket.broadcast.to(user.room).emit("bot", {
      user: { name: user.name },
      msg: "Joined the chat",
    });
    // faqat user o'ziga ko'rinmaydi

    socket.emit("room", options.room);
  });

  io.on("message", (msg) => {
    // const user = getCurrentUser(socket.id);
    // io.to(user.room).emit("message", { user, msg });
    console.log(msg);
  });

  socket.on("disconnect", () => {
    const user = leftUser(socket.id);
    socket.broadcast.to(user.room).emit("left", { user, msg: "Left the chat " });
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(3000, () => console.log(`Server working on port ${PORT}`));
