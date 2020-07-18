const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = 3000;

app.get("/", (req, res) => res.sendFile(__dirname + "/templates/index.html"));

io.on("connection", (socket) => {
  console.log("유저 연결");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnet", () => {
    console.log("유저가 나갔습니다.");
  });
});

http.listen(port, () => {
  console.log(`connect at ${port}`);
});
