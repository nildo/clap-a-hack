const express = require("express");
const socketIO = require('socket.io');

const app = express();

app.use(express.static("client/build"));

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const io = socketIO(listener, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const state = {
   rooms: {} 
};
const rooms = io.of("/").adapter.rooms;

io.on('connection', (client) => {

  const { room } = client.handshake.query;

  if(rooms[room]){
    rooms[room].numOnlineUsers++;
  } else {
    rooms[room] = {
      numOnlineUsers: 1,
      laughCount: 0,
    }
  }
  client.join(room);

  state.numOnlineUsers++;

  io.emit('stateUpdate', rooms[room]);

  client.on('laugh', () => {
    rooms[room].laughCount++;

    io.emit('stateUpdate', rooms[room]);

    setTimeout(() => {
      state.laughCount--;
      io.emit('stateUpdate', rooms[room]);
    }, 5000);
  });

  client.on('disconnect', () => {
    rooms[room].numOnlineUsers--;
    io.emit('stateUpdate', rooms[room]);
  });
});


io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});


