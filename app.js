const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

let room = ["room1", "room2"];
let a = 0;

app.get("/", (req, res) => {
  res.render("chat");
});

const ns = io.of("/test");

ns.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("leaveRoom", (num, name) => {
    socket.leave(room[num], () => {
      console.log(name + " leave a " + room[num]);
      ns.to(room[num]).emit("leaveRoom", num, name);
    });
  });

  socket.on("joinRoom", (num, name) => {
    socket.join(room[num], () => {
      console.log(name + " join a " + room[num]);
      ns.to(room[num]).emit("joinRoom", num, name);
    });
  });

  socket.on("chat message", (num, name, msg) => {
    a = num;
    ns.to(room[a]).emit("chat message", name, msg);
  });
});

http.listen(port, () => {
  console.log(`connect at ${port}`);
});
